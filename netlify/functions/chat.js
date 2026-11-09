// netlify/functions/chat.js — сервер Programer AI.
// Ключ OpenRouter хранится ТОЛЬКО в настройках Netlify (переменная OPENROUTER_API_KEY),
// в код сайта его вставлять нельзя.

const SYSTEM_PROMPT =
    "Ты — Programer AI, дружелюбный помощник по программированию на сайте Programer Help. " +
    "Тебя читают школьники и новички. Отвечай по-русски, коротко и понятно, простыми словами. " +
    "Примеры кода пиши в блоках с указанием языка: ```html, ```css или ```javascript. " +
    "Если ученик просит решить учебное задание целиком, сначала дай подсказку и объясни ход мысли. " +
    "Если вопрос не связан с программированием и обучением, вежливо верни разговор к теме.";

// Названия моделей можно поменять в Netlify (Environment variables), не трогая код.
// Актуальный список: https://openrouter.ai/models
function modelFor(choice) {
    const models = {
        "openai": process.env.MODEL_OPENAI || "openai/gpt-4o-mini",
        "anthropic": process.env.MODEL_ANTHROPIC || "anthropic/claude-3.5-haiku",
        "google": process.env.MODEL_GOOGLE || "google/gemini-2.0-flash-001",
        "x-ai": process.env.MODEL_XAI || "x-ai/grok-3-mini"
    };
    return models[choice] || models.openai;
}

// Простая защита от спама: не больше 10 запросов в минуту с одного адреса
const hits = new Map();

function tooManyRequests(ip) {
    const now = Date.now();
    const list = (hits.get(ip) || []).filter(function (t) { return now - t < 60000; });
    list.push(now);
    hits.set(ip, list);
    return list.length > 10;
}

function reply(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    };
}

exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {
        return reply(405, { error: "Метод не поддерживается" });
    }

    let data;

    try {
        data = JSON.parse(event.body || "{}");
    } catch (e) {
        return reply(400, { error: "Ошибка обработки запроса" });
    }

    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (!message) return reply(400, { error: "Напиши сообщение" });
    if (message.length > 5000) return reply(400, { error: "Сообщение слишком длинное" });

    const headers = event.headers || {};
    const ip = headers["x-nf-client-connection-ip"] || headers["client-ip"] || headers["x-forwarded-for"] || "unknown";

    if (tooManyRequests(ip)) {
        return reply(429, { error: "Слишком много сообщений. Подожди минуту и попробуй снова." });
    }

    // Убираем случайные пробелы, переносы строк и кавычки, которые часто попадают при копировании
    const key = (process.env.OPENROUTER_API_KEY || "").trim().replace(/^["']+|["']+$/g, "").trim();

    // Ключ ещё не добавлен: сайт не ломается, а просто сообщает об этом
    if (!key) {
        return reply(200, {
            reply: "Сервер Programer AI работает, но модель ИИ ещё не подключена. " +
                "Владельцу сайта нужно добавить ключ OPENROUTER_API_KEY в настройках Netlify."
        });
    }

    // Последние сообщения диалога, чтобы ИИ помнил, о чём шла речь
    const history = Array.isArray(data.history) ? data.history : [];

    const past = history
        .filter(function (m) {
            return m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string";
        })
        .slice(-10)
        .map(function (m) { return { role: m.role, content: m.content.slice(0, 2000) }; });

    const messages = [{ role: "system", content: SYSTEM_PROMPT }].concat(past, [{ role: "user", content: message }]);

    const controller = new AbortController();
    const timer = setTimeout(function () { controller.abort(); }, 9000);

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + key,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.SITE_URL || "https://programerhelp.netlify.app",
                "X-Title": "Programer Help"
            },
            body: JSON.stringify({
                model: modelFor(data.model),
                messages: messages,
                max_tokens: 700,
                temperature: 0.5
            }),
            signal: controller.signal
        });

        const result = await response.json().catch(function () { return {}; });

        if (!response.ok) {
            console.error("OpenRouter error", response.status, modelFor(data.model), JSON.stringify(result).slice(0, 500));

            // Понятная причина вместо общей фразы (технические детали остаются в логах Netlify)
            const reasons = {
                400: "Эта модель не приняла запрос. Выбери другую модель в списке.",
                401: "OpenRouter не принял ключ. Создай на openrouter.ai новый ключ и заново вставь его в переменную OPENROUTER_API_KEY в Netlify." +
                    (key.indexOf("sk-or-") === 0 ? "" : " Ключ OpenRouter начинается с sk-or-, а у тебя в переменной другой: возможно, вставлен ключ другого сервиса."),
                402: "На балансе OpenRouter нет средств. Пополни баланс на openrouter.ai/credits.",
                403: "OpenRouter отклонил запрос. Проверь настройки ключа на openrouter.ai.",
                404: "Эта модель сейчас недоступна. Выбери другую модель в списке.",
                429: "У ИИ сейчас слишком много запросов. Подожди минуту и попробуй снова."
            };

            return reply(502, { error: reasons[response.status] || "ИИ сейчас недоступен. Попробуй ещё раз позже." });
        }

        const text = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;

        if (!text) return reply(502, { error: "ИИ вернул пустой ответ. Попробуй переформулировать вопрос." });

        return reply(200, { reply: text });

    } catch (error) {
        if (error.name === "AbortError") {
            return reply(504, { error: "ИИ слишком долго думает. Попробуй задать вопрос короче." });
        }
        console.error(error);
        return reply(500, { error: "Ошибка сервера" });
    } finally {
        clearTimeout(timer);
    }
};  
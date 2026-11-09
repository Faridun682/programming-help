// stats.js — очки опыта (XP), серия дней, значки и профиль ученика
(function (root) {

    var KEY = "ph_stats";
    var TOTALS = { html: 5, css: 5, js: 5, algo: 8, func: 8, proj: 8 };
    var TRACK_BADGE = { html: "b_html", css: "b_css", js: "b_js", algo: "b_algo", func: "b_func", proj: "b_proj" };

    var BADGES = {
        first:   { icon: "🌱", title: "Первый шаг", text: "Выполнено первое задание" },
        ten:     { icon: "🔟", title: "Десятка", text: "Выполнено 10 заданий" },
        all:     { icon: "🏆", title: "Легенда", text: "Пройдены все задания" },
        b_html:  { icon: "🌐", title: "Мастер HTML", text: "Пройден квест HTML" },
        b_css:   { icon: "🎨", title: "Мастер CSS", text: "Пройден квест CSS" },
        b_js:    { icon: "⚡", title: "Мастер JavaScript", text: "Пройден квест JavaScript" },
        b_algo:  { icon: "🧮", title: "Алгоритмист", text: "Решены все задачи" },
        b_func:  { icon: "🔧", title: "Мастер функций", text: "Пройден квест «Функции»" },
        b_proj:  { icon: "🏗", title: "Строитель", text: "Пройден квест «Проекты»" },
        exam:    { icon: "🎯", title: "Отличник", text: "Сдал экзамен без единой ошибки" },
        streak3: { icon: "🔥", title: "3 дня подряд", text: "Занимался 3 дня подряд" },
        streak7: { icon: "🚀", title: "Неделя подряд", text: "Занимался 7 дней подряд" },
        daily:   { icon: "📅", title: "Задача дня", text: "Решил задачу дня" },
        quiz:    { icon: "🧠", title: "Умник", text: "Ответил на все вопросы квиза правильно" }
    };

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function today() {
        var d = new Date();
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    }

    function dayNum(str) {
        var p = str.split("-");
        return Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000);
    }

    function read() {
        var s = null;
        try { s = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
        return Object.assign({ xp: 0, streak: 0, last: "", badges: [], dailyDone: "", quiz: {} }, s || {});
    }

    function write(s) {
        try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    }

    function readProgress() {
        try { return JSON.parse(localStorage.getItem("ph_progress") || "{}") || {}; } catch (e) { return {}; }
    }

    // считаем занятие: продлеваем серию дней
    function touch(s) {
        var t = today();
        if (s.last === t) return;
        if (s.last && dayNum(t) - dayNum(s.last) === 1) s.streak = (s.streak || 0) + 1;
        else s.streak = 1;
        s.last = t;
    }

    function award(s, id, fresh) {
        if (s.badges.indexOf(id) === -1) {
            s.badges.push(id);
            fresh.push(id);
        }
    }

    function counts() {
        var p = readProgress();
        var per = {};
        var total = 0;
        var all = 0;
        Object.keys(TOTALS).forEach(function (k) {
            var d = Math.min(Array.isArray(p[k]) ? p[k].length : 0, TOTALS[k]);
            per[k] = d;
            total += d;
            all += TOTALS[k];
        });
        return { per: per, total: total, all: all };
    }

    function level(xp) { return Math.floor(xp / 100) + 1; }

    function streakNow(s) {
        if (!s.last) return 0;
        return dayNum(today()) - dayNum(s.last) <= 1 ? s.streak : 0;
    }

    function checkBadges(s, fresh, track) {
        var c = counts();
        if (c.total >= 1) award(s, "first", fresh);
        if (c.total >= 10) award(s, "ten", fresh);
        if (track && TRACK_BADGE[track] && c.per[track] >= TOTALS[track]) award(s, TRACK_BADGE[track], fresh);
        if (c.total >= c.all) award(s, "all", fresh);
        if (s.streak >= 3) award(s, "streak3", fresh);
        if (s.streak >= 7) award(s, "streak7", fresh);
    }

    // вызывается, когда задание пройдено
    function onTaskDone(track, isNew, daily) {
        var s = read();
        var fresh = [];
        var gained = 0;

        touch(s);

        if (isNew) gained += (track === "algo" || track === "func") ? 20 : 10;

        if (daily && s.dailyDone !== today()) {
            gained += 15;
            s.dailyDone = today();
            award(s, "daily", fresh);
        }

        s.xp += gained;
        checkBadges(s, fresh, track);
        write(s);

        return { xp: gained, badges: fresh, streak: s.streak, level: level(s.xp) };
    }

    // вызывается, когда пройден квиз
    function onQuiz(id, score, total) {
        var s = read();
        var fresh = [];
        var gained = 0;

        touch(s);

        var prev = s.quiz[id] || 0;
        if (score > prev) {
            gained = (score - prev) * 2;
            s.quiz[id] = score;
        }

        s.xp += gained;
        if (score === total) award(s, "quiz", fresh);
        checkBadges(s, fresh, null);
        write(s);

        return { xp: gained, badges: fresh, streak: s.streak, level: level(s.xp) };
    }

    // вызывается, когда экзамен завершён
    function onExam(score, total) {
        var s = read();
        var fresh = [];

        touch(s);

        var gained = score * 5;
        s.xp += gained;

        if (score === total) award(s, "exam", fresh);
        checkBadges(s, fresh, null);
        write(s);

        return { xp: gained, badges: fresh, streak: s.streak, level: level(s.xp) };
    }

    function get() {
        var s = read();
        return {
            xp: s.xp,
            level: level(s.xp),
            inLevel: s.xp % 100,
            streak: streakNow(s),
            badges: s.badges,
            dailyDone: s.dailyDone === today(),
            quiz: s.quiz
        };
    }

    function el(tag, css, text) {
        var e = document.createElement(tag);
        if (css) e.style.cssText = css;
        if (text !== undefined) e.textContent = text;
        return e;
    }

    // профиль ученика (на странице уроков)
    function renderProfile(box) {

        var g = get();
        box.innerHTML = "";
        box.style.cssText = "background:#fff;border-radius:12px;box-shadow:0 2px 10px #00000010;padding:20px;margin:0 0 30px;text-align:left";

        var top = el("div", "display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between");

        var left = el("div", "flex:1;min-width:220px");
        left.appendChild(el("div", "font-size:20px;font-weight:bold;color:#0f172a", "🎖 Уровень " + g.level));

        var bar = el("div", "height:10px;background:#e2e8f0;border-radius:6px;overflow:hidden;margin:8px 0 4px");
        bar.appendChild(el("div", "height:100%;background:#2563eb;width:" + g.inLevel + "%"));
        left.appendChild(bar);
        left.appendChild(el("div", "font-size:13px;color:#64748b", "Опыт: " + g.xp + " XP · до следующего уровня " + (100 - g.inLevel)));
        top.appendChild(left);

        top.appendChild(el("div", "font-size:18px;font-weight:bold;color:#ea580c", "🔥 Серия: " + g.streak + " дн."));

        var daily = el("a", "display:inline-block;padding:11px 18px;border-radius:8px;text-decoration:none;font-weight:bold;color:#fff;background:" + (g.dailyDone ? "#16a34a" : "#2563eb"),
            g.dailyDone ? "✅ Задача дня решена" : "📅 Решить задачу дня");
        daily.href = "code.html?daily=1";
        top.appendChild(daily);

        box.appendChild(top);

        var names = Object.keys(BADGES);
        var got = names.filter(function (k) { return g.badges.indexOf(k) > -1; }).length;

        box.appendChild(el("div", "margin:16px 0 8px;font-size:13px;color:#64748b", "Значки: " + got + " из " + names.length));

        var row = el("div", "display:flex;flex-wrap:wrap;gap:10px");

        names.forEach(function (k) {
            var has = g.badges.indexOf(k) > -1;
            var b = el("span", "font-size:28px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#f1f5f9;" + (has ? "" : "filter:grayscale(1);opacity:.3"), BADGES[k].icon);
            b.title = BADGES[k].title + ": " + BADGES[k].text + (has ? "" : " (ещё не получен)");
            row.appendChild(b);
        });

        box.appendChild(row);
    }

    // карточки, которые добавляются на страницу уроков
    var TRACK_CARDS = [
        { key: "algo", title: "Задачи 🧮", text: "Олимпиадные задачи на условия: напиши функцию, а сайт проверит её по тестам.", href: "code.html?track=algo&task=1", btn: "Решать задачи" },
        { key: "func", title: "Функции 🔧", text: "Учись писать свои функции: от квадрата числа до чисел Фибоначчи.", href: "code.html?track=func&task=1", btn: "Начать" },
        { key: "proj", title: "Проекты 🏗", text: "Собери настоящие мини-сайты шаг за шагом: сайт-визитку и список дел.", href: "code.html?track=proj&task=1", btn: "Строить проекты" }
    ];

    function findCard(box, prefix) {
        var cards = box.querySelectorAll(".card");
        for (var i = 0; i < cards.length; i++) {
            var h = cards[i].querySelector("h2");
            if (h && h.textContent.trim().indexOf(prefix) === 0) return cards[i];
        }
        return null;
    }

    function makeCard(title, text, href, btn) {
        var card = el("div");
        card.className = "card";
        card.appendChild(el("h2", "", title));
        card.appendChild(el("p", "", text));
        var a = el("a", "", btn);
        a.href = href;
        card.appendChild(a);
        return card;
    }

    function addBar(card, key) {

        if (/Выполнено:|Пройдено:/.test(card.textContent)) return;

        var d = Math.min(counts().per[key], TOTALS[key]);
        var total = TOTALS[key];

        var wrap = el("div", "margin:0 0 18px");
        wrap.appendChild(el("div", "font-size:13px;color:#64748b;margin-bottom:6px",
            (d === total ? "✅ Пройдено: " : "Выполнено: ") + d + " из " + total));

        var bar = el("div", "height:8px;background:#e2e8f0;border-radius:5px;overflow:hidden");
        bar.appendChild(el("div", "height:100%;background:#22c55e;width:" + Math.round(d / total * 100) + "%"));
        wrap.appendChild(bar);

        card.insertBefore(wrap, card.querySelector("a"));
    }

    // дополнения на странице уроков: полоски прогресса, новые карточки, сертификаты
    function addExtras() {

        var box = document.querySelector(".cards");
        if (!box || box.getAttribute("data-ph-extras")) return;
        box.setAttribute("data-ph-extras", "1");

        var byTitle = { "HTML": "html", "CSS": "css", "JavaScript": "js" };

        box.querySelectorAll(".card").forEach(function (card) {
            var h = card.querySelector("h2");
            var key = h && byTitle[h.textContent.trim()];
            if (key) addBar(card, key);
        });

        TRACK_CARDS.forEach(function (c) {
            var card = findCard(box, c.title.split(" ")[0]);
            if (!card) {
                card = makeCard(c.title, c.text, c.href, c.btn);
                box.appendChild(card);
            }
            addBar(card, c.key);
        });

        if (!findCard(box, "Экзамен")) {
            box.appendChild(makeCard("Экзамен 🎯", "5 случайных задач за 20 минут без подсказок. Проверь, чему ты научился.", "code.html?exam=1", "Начать экзамен"));
        }

        if (!findCard(box, "Шпаргалка")) {
            box.appendChild(makeCard("Шпаргалка 📚", "Теги, свойства и команды в одном месте. Есть поиск, копирование и запуск примеров.", "cheatsheet.html", "Открыть шпаргалку"));
        }

        // сертификаты у пройденных квестов
        var c = counts();
        var keyByPrefix = { "HTML": "html", "CSS": "css", "JavaScript": "js", "Задачи": "algo", "Функции": "func", "Проекты": "proj" };

        box.querySelectorAll(".card").forEach(function (card) {
            var h = card.querySelector("h2");
            if (!h || card.querySelector("a[href^='certificate.html']")) return;

            var first = h.textContent.trim().split(" ")[0];
            var key = keyByPrefix[first];

            if (key && c.per[key] >= TOTALS[key]) {
                var wrap = el("div", "margin-top:14px");
                var a = el("a", "display:inline-block;background:none;color:#16a34a;font-weight:bold;font-size:14px;padding:0;text-decoration:none", "🎓 Получить сертификат");
                a.href = "certificate.html?track=" + key;
                wrap.appendChild(a);
                card.appendChild(wrap);
            }
        });

        // общий итог под профилем
        if (!/Всего выполнено/.test(document.body.textContent)) {
            var total = 0;
            var sum = 0;
            Object.keys(TOTALS).forEach(function (k) { total += TOTALS[k]; sum += c.per[k]; });

            var line = el("div", "margin:-15px 0 30px;font-weight:bold;color:#2563eb", "Всего выполнено: " + sum + " из " + total);
            box.parentNode.insertBefore(line, box);
        }
    }

    function init() {
        var p = document.getElementById("ph-profile");
        if (p) renderProfile(p);
        addExtras();
    }

    root.PHStats = {
        BADGES: BADGES,
        TOTALS: TOTALS,
        setTotals: function (t) { Object.keys(t).forEach(function (k) { TOTALS[k] = t[k]; }); },
        today: today,
        get: get,
        onTaskDone: onTaskDone,
        onQuiz: onQuiz,
        onExam: onExam,
        renderProfile: renderProfile
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();

})(window);
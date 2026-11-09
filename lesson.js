// lesson.js — кнопки «Копировать» и «Попробовать» под примерами кода в уроках
(function () {

    var style = document.createElement("style");
    style.textContent =
        ".ph-ex-row{display:flex;gap:8px;justify-content:flex-end;margin:-6px 0 18px}" +
        ".ph-ex-row button,.ph-ex-row a{background:#e2e8f0;color:#0f172a;border:1px solid #cbd5e1;" +
        "border-radius:6px;padding:6px 12px;font:13px Arial,sans-serif;cursor:pointer;text-decoration:none}" +
        ".ph-ex-row a{background:#2563eb;border-color:#2563eb;color:#fff;font-weight:bold}" +
        ".ph-ex-row button:hover,.ph-ex-row a:hover{opacity:.85}";
    document.head.appendChild(style);

    var DEF_HTML_FOR_CSS =
        "<h1>Заголовок</h1>\n<p>Обычный абзац текста.</p>\n<p class=\"important\">Важный текст</p>\n" +
        "<p class=\"note\">Это просто заметка</p>\n<div class=\"box\">\n    <h2>Карточка</h2>\n" +
        "    <p>Текст внутри блока.</p>\n</div>\n<button class=\"btn\">Кнопка</button>";

    var DEF_HTML_FOR_JS =
        "<h1 id=\"title\">Привет!</h1>\n<p id=\"out\"></p>\n<button id=\"btn\">Нажми на меня</button>";

    function isTagLine(line) {
        return /^\s*<\/?[a-z!]/i.test(line);
    }

    // Определяем, какой это код, и раскладываем по вкладкам HTML / CSS / JS
    function buildProject(text) {

        var hasTags = /^\s*<\/?[a-z!]/im.test(text);
        var hasJs = /\b(const|let|var|function|addEventListener|console\.)/.test(text);
        var hasCss = /[^\s{}]+\s*\{[^}]*:[^}]*;[^}]*\}/.test(text);

        if (/<(style|script)\b/i.test(text)) return { h: text, c: "", j: "", tab: "html" };

        if (hasTags && (hasJs || hasCss)) {
            var h = [];
            var rest = [];
            text.split("\n").forEach(function (l) { (isTagLine(l) ? h : rest).push(l); });
            var restText = rest.join("\n").trim();
            if (hasJs) return { h: h.join("\n"), c: "", j: restText, tab: "javascript" };
            return { h: h.join("\n"), c: restText, j: "", tab: "css" };
        }

        if (hasTags) return { h: text, c: "", j: "", tab: "html" };
        if (hasCss && !hasJs) return { h: DEF_HTML_FOR_CSS, c: text, j: "", tab: "css" };
        return { h: DEF_HTML_FOR_JS, c: "", j: text, tab: "javascript" };
    }

    function encode(obj) {
        var bytes = new TextEncoder().encode(JSON.stringify(obj));
        var bin = "";
        for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return encodeURIComponent(btoa(bin));
    }

    function copy(text, done) {
        function fallback() {
            var ta = document.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;opacity:0";
            document.body.appendChild(ta);
            ta.select();
            var ok = false;
            try { ok = document.execCommand("copy"); } catch (e) {}
            ta.remove();
            done(ok);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
        } else {
            fallback();
        }
    }

    function init() {

        document.querySelectorAll(".example").forEach(function (box) {

            var text = (box.innerText || box.textContent || "").replace(/\u00a0/g, " ").trim();
            if (!text) return;

            var project = buildProject(text);

            var row = document.createElement("div");
            row.className = "ph-ex-row";

            var copyBtn = document.createElement("button");
            copyBtn.type = "button";
            copyBtn.textContent = "Копировать";
            copyBtn.onclick = function () {
                copy(text, function (ok) {
                    copyBtn.textContent = ok ? "Скопировано ✓" : "Не удалось";
                    setTimeout(function () { copyBtn.textContent = "Копировать"; }, 1600);
                });
            };

            var tryBtn = document.createElement("a");
            tryBtn.textContent = "▶ Попробовать";
            tryBtn.href = "code.html?code=" + encode({ h: project.h, c: project.c, j: project.j }) + "&tab=" + project.tab;

            row.appendChild(copyBtn);
            row.appendChild(tryBtn);
            box.parentNode.insertBefore(row, box.nextSibling);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
(function () {
    var KEY = "ph_settings";

    function read() {
        try { return JSON.parse(localStorage.getItem(KEY) || "null") || {}; } catch (e) { return {}; }
    }

    function save(theme) {
        var s = read();
        s.theme = theme;
        try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    }

    function systemTheme() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    var theme = read().theme || systemTheme();
    var root = document.documentElement;

    // Фон <html> делаем таким же, как у страницы, чтобы внизу не было чёрной полосы
    function syncBackground() {
        if (!document.body) return;
        var bg = window.getComputedStyle(document.body).backgroundColor;
        var transparent = !bg || bg === "transparent" || bg === "rgba(0, 0, 0, 0)";
        root.style.backgroundColor = transparent ? "#ffffff" : bg;
    }

    function apply() {
        root.classList.toggle("ph-dark", theme === "dark");
        syncBackground();
        var btn = document.getElementById("ph-theme-btn");
        if (btn) {
            btn.textContent = theme === "dark" ? "☀️" : "🌙";
            btn.title = theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";
        }
    }

    // ---------- Установка как приложение и работа без интернета ----------
    (function () {
        var m = document.createElement("link");
        m.rel = "manifest";
        m.href = "manifest.json";
        document.head.appendChild(m);

        var tc = document.createElement("meta");
        tc.name = "theme-color";
        tc.content = "#2563eb";
        document.head.appendChild(tc);

        if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("sw.js").catch(function () {});
            });
        }
    })();

    var installEvent = null;

    function showInstallButton() {
        if (!installEvent || !document.body || document.getElementById("ph-install-btn")) return;

        var st = document.createElement("style");
        st.textContent =
            "#ph-install-btn{position:fixed;left:248px;bottom:16px;z-index:99999;height:46px;padding:0 16px;" +
            "border-radius:23px;border:1px solid #2563eb;background:#2563eb;color:#fff;font-size:14px;" +
            "font-family:Arial,sans-serif;font-weight:bold;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.25)}" +
            "html.ph-dark #ph-install-btn{filter:invert(1) hue-rotate(180deg)}";
        document.head.appendChild(st);

        var b = document.createElement("button");
        b.id = "ph-install-btn";
        b.textContent = "📲 Установить";
        b.onclick = function () {
            installEvent.prompt();
            installEvent = null;
            b.remove();
        };
        document.body.appendChild(b);
    }

    window.addEventListener("beforeinstallprompt", function (e) {
        e.preventDefault();
        installEvent = e;
        showInstallButton();
    });

    window.addEventListener("appinstalled", function () {
        var b = document.getElementById("ph-install-btn");
        if (b) b.remove();
    });

    var style = document.createElement("style");
    style.textContent =
        "html{background-color:#fff}" +
        "body{min-height:100vh}" +
        "html.ph-dark{filter:invert(1) hue-rotate(180deg) brightness(.93) contrast(.95)}" +
        "html.ph-dark img,html.ph-dark video,html.ph-dark picture,html.ph-dark canvas,html.ph-dark iframe," +
        "html.ph-dark .example,html.ph-dark .codebox,html.ph-dark :not(.example):not(.codebox)>pre{filter:invert(1) hue-rotate(180deg)}" +
        "#ph-theme-btn{position:fixed;left:16px;bottom:16px;z-index:99999;width:46px;height:46px;" +
        "border-radius:50%;border:1px solid #cbd5e1;background:#fff;color:#0f172a;font-size:22px;" +
        "cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.25)}" +
        "html.ph-dark #ph-theme-btn{filter:invert(1) hue-rotate(180deg)}";
    document.head.appendChild(style);

    apply();

    document.addEventListener("DOMContentLoaded", function () {
        var btn = document.createElement("button");
        btn.id = "ph-theme-btn";
        btn.onclick = function () {
            theme = theme === "dark" ? "light" : "dark";
            save(theme);
            apply();
        };
        document.body.appendChild(btn);

        // Кнопка «Нашли ошибку?» — ведёт на страницу контактов
        if (!/contacts/.test(location.pathname)) {
            var bugStyle = document.createElement("style");
            bugStyle.textContent =
                "#ph-bug-btn{position:fixed;left:72px;bottom:16px;z-index:99999;height:46px;padding:0 16px;" +
                "border-radius:23px;border:1px solid #cbd5e1;background:#fff;color:#0f172a;font-size:14px;" +
                "font-family:Arial,sans-serif;font-weight:bold;cursor:pointer;text-decoration:none;" +
                "display:flex;align-items:center;box-shadow:0 2px 10px rgba(0,0,0,.25)}" +
                "#ph-bug-btn:hover{background:#fee2e2}" +
                "html.ph-dark #ph-bug-btn{filter:invert(1) hue-rotate(180deg)}";
            document.head.appendChild(bugStyle);

            var bug = document.createElement("a");
            bug.id = "ph-bug-btn";
            bug.textContent = "🐞 Нашли ошибку?";
            bug.href = "contacts.html?bug=1&from=" + encodeURIComponent(document.title + " (" + location.pathname + ")");
            document.body.appendChild(bug);
        }

        apply();
        showInstallButton();
    });

    window.addEventListener("load", syncBackground);

    window.addEventListener("storage", function (e) {
        if (e.key === KEY) {
            theme = read().theme || theme;
            apply();
        }
    });
})();
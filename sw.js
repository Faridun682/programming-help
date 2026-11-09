// sw.js — работа сайта без интернета и установка как приложения
var VERSION = "ph-v1";

// файлы, которые сохраняются сразу при первом заходе
var CORE = [
    "./", "index.html", "lessons.html", "html-lesson-1.html", "css-lesson-1.html", "js-lesson-1.html",
    "code.html", "cheatsheet.html", "certificate.html", "ai.html", "about.html", "contacts.html", "help.html",
    "theme.js", "lesson.js", "stats.js", "quiz.js", "manifest.json", "icon-192.png", "icon-512.png"
];

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(VERSION).then(function (cache) {
            // если какого-то файла нет, это не ломает установку
            return Promise.all(CORE.map(function (url) {
                return cache.add(url).catch(function () {});
            }));
        }).then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener("activate", function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
        }).then(function () { return self.clients.claim(); })
    );
});

function remember(req, res) {
    if (res && (res.ok || res.type === "opaque")) {
        var copy = res.clone();
        caches.open(VERSION).then(function (cache) { cache.put(req, copy); });
    }
    return res;
}

self.addEventListener("fetch", function (e) {

    var req = e.request;
    if (req.method !== "GET") return;

    var url = new URL(req.url);
    if (url.protocol.indexOf("http") !== 0) return;

    // Свои файлы: сначала сеть (всегда свежая версия), без интернета — из сохранённого
    if (url.origin === self.location.origin) {
        e.respondWith(
            fetch(req).then(function (res) { return remember(req, res); }).catch(function () {
                return caches.match(req, { ignoreSearch: true }).then(function (hit) {
                    return hit || caches.match("lessons.html") || caches.match("index.html");
                });
            })
        );
        return;
    }

    // Редактор Monaco и шрифты с CDN: один раз скачали, дальше берём из сохранённого
    if (/cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.hostname)) {
        e.respondWith(
            caches.match(req).then(function (hit) {
                return hit || fetch(req).then(function (res) { return remember(req, res); });
            })
        );
    }
});

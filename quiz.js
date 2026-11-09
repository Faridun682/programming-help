// quiz.js — мини-тест в конце урока. На странице нужен блок:
// <div id="ph-quiz" data-quiz="html1"></div>
(function () {

    var BANK = {
        html1: [
            { q: "Что такое HTML?", a: ["Язык разметки для структуры веб-страниц", "Язык программирования", "Язык для оформления страниц", "База данных"], ok: 0, why: "HTML создаёт структуру страницы, а оформлением занимается CSS." },
            { q: "Какой тег создаёт главный заголовок?", a: ["h1", "head", "header", "title"], ok: 0, why: "h1 — самый главный заголовок страницы." },
            { q: "Каким тегом записывают абзац текста?", a: ["p", "a", "ul", "br"], ok: 0, why: "p (paragraph) — абзац." },
            { q: "Что находится внутри тега body?", a: ["Основное содержимое страницы", "Название вкладки", "Подключение шрифтов", "Описание для поисковиков"], ok: 0, why: "Всё, что человек видит на странице, находится внутри body." },
            { q: "Где отображается текст из тега title?", a: ["Во вкладке браузера", "Крупно в начале страницы", "В подвале страницы", "Нигде не отображается"], ok: 0, why: "title — название страницы во вкладке браузера." }
        ],
        css1: [
            { q: "За что отвечает CSS?", a: ["За внешний вид страницы", "За структуру страницы", "За работу с базой данных", "За отправку почты"], ok: 0, why: "CSS задаёт цвета, шрифты, отступы и расположение." },
            { q: "Как называется h1 в правиле h1 { color: blue; }?", a: ["Селектор", "Свойство", "Значение", "Тег-обёртка"], ok: 0, why: "Селектор показывает, к каким элементам применить стиль." },
            { q: "Какое свойство меняет цвет текста?", a: ["color", "background-color", "font-size", "text-align"], ok: 0, why: "color — цвет текста, а background-color — цвет фона." },
            { q: "Как в CSS обратиться к элементу с классом box?", a: [".box", "#box", "box()", "<box>"], ok: 0, why: "Перед названием класса ставится точка, а перед id — решётка." },
            { q: "Какое свойство скругляет углы блока?", a: ["border-radius", "border-style", "padding", "margin"], ok: 0, why: "border-radius задаёт радиус скругления углов." }
        ],
        js1: [
            { q: "Для чего нужен JavaScript на сайте?", a: ["Делает страницу интерактивной", "Задаёт цвет текста", "Создаёт заголовки", "Хранит картинки"], ok: 0, why: "JavaScript отвечает за поведение: клики, анимации, проверки." },
            { q: "Каким словом создают переменную, значение которой нельзя менять?", a: ["const", "let", "var", "function"], ok: 0, why: "const — константа. Значение let можно менять." },
            { q: "Что выведет console.log(2 + 3)?", a: ["5", "23", "2 + 3", "Ошибку"], ok: 0, why: "Числа складываются: 2 + 3 = 5." },
            { q: "Что делает document.getElementById(\"title\")?", a: ["Находит элемент с id title", "Создаёт новый заголовок", "Удаляет страницу", "Меняет цвет заголовка"], ok: 0, why: "Метод ищет на странице элемент по его id." },
            { q: "Как называется набор команд с именем, который можно вызывать много раз?", a: ["Функция", "Переменная", "Тег", "Селектор"], ok: 0, why: "Функцию описывают один раз и вызывают, когда нужно." }
        ]
    };

    function shuffle(list) {
        var a = list.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    function el(tag, css, text) {
        var e = document.createElement(tag);
        if (css) e.style.cssText = css;
        if (text !== undefined) e.textContent = text;
        return e;
    }

    function start(box) {

        var id = box.getAttribute("data-quiz");
        var questions = BANK[id];
        if (!questions) return;

        var index = 0;
        var score = 0;

        box.style.cssText = "background:#fff;border-radius:10px;padding:25px;box-shadow:0 2px 10px #00000010;margin:15px 0 30px";

        function render() {

            box.innerHTML = "";

            if (index >= questions.length) return finish();

            var item = questions[index];

            box.appendChild(el("div", "font-size:13px;color:#64748b;margin-bottom:8px", "Вопрос " + (index + 1) + " из " + questions.length));
            box.appendChild(el("div", "font-size:18px;font-weight:bold;margin-bottom:14px", item.q));

            var answers = shuffle(item.a.map(function (text, i) { return { text: text, right: i === item.ok }; }));
            var locked = false;
            var feedback = el("div", "margin-top:14px;display:none");
            var buttons = [];

            answers.forEach(function (ans) {

                var b = el("button", "display:block;width:100%;text-align:left;padding:12px 14px;margin-bottom:8px;border:2px solid #e2e8f0;border-radius:8px;background:#f8fafc;color:#0f172a;font:15px Arial,sans-serif;cursor:pointer", ans.text);
                b.type = "button";
                b.setAttribute("data-right", ans.right ? "1" : "0");
                buttons.push(b);

                b.onclick = function () {
                    if (locked) return;
                    locked = true;

                    if (ans.right) score++;

                    buttons.forEach(function (x) {
                        if (x.getAttribute("data-right") === "1") {
                            x.style.borderColor = "#16a34a";
                            x.style.background = "#dcfce7";
                        }
                    });

                    if (!ans.right) {
                        b.style.borderColor = "#dc2626";
                        b.style.background = "#fee2e2";
                    }

                    feedback.style.display = "block";
                    feedback.innerHTML = "";
                    feedback.appendChild(el("div", "font-weight:bold;margin-bottom:6px;color:" + (ans.right ? "#16a34a" : "#dc2626"), ans.right ? "✅ Верно!" : "❌ Не совсем."));
                    feedback.appendChild(el("div", "color:#475569;line-height:1.5", item.why));

                    var next = el("button", "margin-top:12px;background:#2563eb;color:#fff;border:0;border-radius:7px;padding:10px 20px;font:bold 15px Arial,sans-serif;cursor:pointer",
                        index + 1 < questions.length ? "Дальше →" : "Показать результат");
                    next.type = "button";
                    next.onclick = function () { index++; render(); };
                    feedback.appendChild(next);
                };

                box.appendChild(b);
            });

            box.appendChild(feedback);
        }

        function finish() {

            var gain = null;
            if (window.PHStats) gain = window.PHStats.onQuiz(id, score, questions.length);

            var perfect = score === questions.length;

            box.appendChild(el("div", "font-size:22px;font-weight:bold;margin-bottom:8px", (perfect ? "🎉 " : "👍 ") + "Результат: " + score + " из " + questions.length));
            box.appendChild(el("div", "color:#475569;margin-bottom:12px", perfect ? "Отлично! Ты всё понял." : "Хороший результат. Перечитай урок и попробуй ещё раз."));

            if (gain && gain.xp > 0) box.appendChild(el("div", "color:#2563eb;font-weight:bold;margin-bottom:6px", "+" + gain.xp + " XP"));

            if (gain && window.PHStats) {
                gain.badges.forEach(function (k) {
                    var b = window.PHStats.BADGES[k];
                    box.appendChild(el("div", "color:#ea580c;font-weight:bold;margin-bottom:6px", "🏅 Новый значок: " + b.icon + " " + b.title));
                });
            }

            var again = el("button", "margin-top:8px;background:#e2e8f0;color:#0f172a;border:0;border-radius:7px;padding:10px 20px;font:bold 15px Arial,sans-serif;cursor:pointer", "Пройти ещё раз");
            again.type = "button";
            again.onclick = function () { index = 0; score = 0; render(); };
            box.appendChild(again);
        }

        render();
    }

    function init() {
        document.querySelectorAll("#ph-quiz, .ph-quiz").forEach(start);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();

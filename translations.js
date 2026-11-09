/* Programer Help RU / UZ / EN language switcher */
(function(){
"use strict";
const dictionary = {
  "Главная": {
    "uz": "Bosh sahifa",
    "en": "Home"
  },
  "Уроки": {
    "uz": "Darslar",
    "en": "Lessons"
  },
  "Шпаргалка": {
    "uz": "Qo‘llanma",
    "en": "Cheatsheet"
  },
  "О сайте": {
    "uz": "Sayt haqida",
    "en": "About"
  },
  "Помощь": {
    "uz": "Yordam",
    "en": "Help"
  },
  "Контакты": {
    "uz": "Aloqa",
    "en": "Contact"
  },
  "Добро пожаловать": {
    "uz": "Xush kelibsiz",
    "en": "Welcome"
  },
  "Создавайте современные и быстрые сайты вместе с нами": {
    "uz": "Biz bilan zamonaviy va tezkor saytlar yarating",
    "en": "Create modern and fast websites with us"
  },
  "Здесь вы найдете полезные статьи, инструменты и руководства для веб-разработки. Начните свой путь прямо сейчас.": {
    "uz": "Bu yerda veb-dasturlash uchun foydali maqolalar, vositalar va qo‘llanmalarni topasiz. O‘z yo‘lingizni hoziroq boshlang.",
    "en": "Here you will find useful articles, tools, and guides for web development. Start your journey today."
  },
  "Узнать больше": {
    "uz": "Batafsil",
    "en": "Learn more"
  },
  "Связаться": {
    "uz": "Bog‘lanish",
    "en": "Contact us"
  },
  "О нашем проекте": {
    "uz": "Loyihamiz haqida",
    "en": "About our project"
  },
  "Добро пожаловать на страницу о сайте! Наш проект создан для того, чтобы делиться полезными знаниями, инструментами и опытом в сфере веб-разработки.": {
    "uz": "Sayt haqidagi sahifaga xush kelibsiz! Loyihamiz veb-dasturlash sohasidagi foydali bilimlar, vositalar va tajriba bilan bo‘lishish uchun yaratilgan.",
    "en": "Welcome to our about page! Our project was created to share useful knowledge, tools, and experience in web development."
  },
  "Помощь - My Web Site": {
    "uz": "Yordam - My Web Site",
    "en": "Help - My Web Site"
  },
  "Контакты - My Web Site": {
    "uz": "Aloqa - My Web Site",
    "en": "Contacts - My Web Site"
  },
  "О сайте - My Web Site": {
    "uz": "Sayt haqida - My Web Site",
    "en": "About - My Web Site"
  },
  "Часто задаваемые вопросы": {
    "uz": "Ko‘p beriladigan savollar",
    "en": "Frequently asked questions"
  },
  "Найдите ответы на самые популярные вопросы о работе нашего сервиса.": {
    "uz": "Xizmatimiz haqidagi eng mashhur savollarga javob toping.",
    "en": "Find answers to the most common questions about our service."
  },
  "Как начать работу с вашими инструментами?": {
    "uz": "Vositalaringizdan foydalanishni qanday boshlash mumkin?",
    "en": "How do I get started with your tools?"
  },
  "Для старта вам достаточно перейти на Главную страницу, выбрать интересующий вас раздел и нажать кнопку «Узнать больше».": {
    "uz": "Boshlash uchun Bosh sahifaga o‘ting, kerakli bo‘limni tanlang va «Batafsil» tugmasini bosing.",
    "en": "To get started, go to the Home page, choose a section, and click “Learn more”."
  },
  "Являются ли материалы бесплатными?": {
    "uz": "Materiallar bepulmi?",
    "en": "Are the materials free?"
  },
  "Да, все базовые руководства, статьи и примеры кода на нашем сайте находятся в открытом доступе для всех пользователей.": {
    "uz": "Ha, saytdagi barcha asosiy qo‘llanmalar, maqolalar va kod namunalari barcha foydalanuvchilar uchun ochiq.",
    "en": "Yes, all basic guides, articles, and code examples on our site are freely available to everyone."
  },
  "Как с вами связаться при возникновении проблем?": {
    "uz": "Muammo yuzaga kelsa, siz bilan qanday bog‘lanish mumkin?",
    "en": "How can I contact you if I have a problem?"
  },
  "Вы можете перейти в раздел «Контакты» и воспользоваться формой обратной связи либо написать нам на электронную почту.": {
    "uz": "«Aloqa» bo‘limiga o‘tib, murojaat shaklidan foydalanishingiz yoki elektron pochta orqali yozishingiz mumkin.",
    "en": "You can visit the Contact section and use the contact form or email us."
  },
  "Уроки программирования": {
    "uz": "Dasturlash darslari",
    "en": "Programming lessons"
  },
  "← Вернуться на главную": {
    "uz": "← Bosh sahifaga qaytish",
    "en": "← Back to home"
  },
  "Изучай веб-разработку с нуля вместе с Programer Help!": {
    "uz": "Programer Help bilan veb-dasturlashni noldan o‘rgan!",
    "en": "Learn web development from scratch with Programer Help!"
  },
  "Изучи основы HTML и научись создавать структуру сайтов.": {
    "uz": "HTML asoslarini o‘rgan va sayt tuzilishini yaratishni boshlа.",
    "en": "Learn HTML basics and create website structures."
  },
  "Научись оформлять сайты, добавлять цвета и создавать дизайн.": {
    "uz": "Saytlarni bezash, ranglar va dizayn yaratishni o‘rgan.",
    "en": "Learn to style websites, add colors, and create designs."
  },
  "Добавляй интерактивность и функциональность на свои сайты.": {
    "uz": "Saytlaringga interaktivlik va funksionallik qo‘sh.",
    "en": "Add interactivity and functionality to your websites."
  },
  "Начать обучение": {
    "uz": "O‘rganishni boshlash",
    "en": "Start learning"
  },
  "← К урокам": {
    "uz": "← Darslarga",
    "en": "← To lessons"
  },
  "← Назад к урокам": {
    "uz": "← Darslarga qaytish",
    "en": "← Back to lessons"
  },
  "← Вернуться ко всем урокам": {
    "uz": "← Barcha darslarga qaytish",
    "en": "← Back to all lessons"
  },
  "Урок 1. Что такое HTML?": {
    "uz": "1-dars. HTML nima?",
    "en": "Lesson 1. What is HTML?"
  },
  "Урок 1. Что такое CSS?": {
    "uz": "1-dars. CSS nima?",
    "en": "Lesson 1. What is CSS?"
  },
  "Урок 1. Что такое JavaScript?": {
    "uz": "1-dars. JavaScript nima?",
    "en": "Lesson 1. What is JavaScript?"
  },
  "HTML — это язык разметки, который используется для создания структуры веб-страниц.": {
    "uz": "HTML — veb-sahifalar tuzilishini yaratish uchun ishlatiladigan belgilash tili.",
    "en": "HTML is a markup language used to create the structure of web pages."
  },
  "CSS — это язык стилей, который отвечает за внешний вид веб-страниц: цвета, шрифты, отступы, размеры и расположение элементов.": {
    "uz": "CSS — veb-sahifalarning ranglari, shriftlari, o‘lchamlari va joylashuvini belgilaydigan uslublar tili.",
    "en": "CSS is the style language that controls web page colors, fonts, spacing, sizes, and layout."
  },
  "JavaScript — это язык программирования, который делает сайты живыми: кнопки реагируют на нажатия, текст меняется, появляются меню, игры и анимации.": {
    "uz": "JavaScript — saytlarni interaktiv qiladigan dasturlash tili: tugmalar bosishga javob beradi, matn o‘zgaradi, menyular, o‘yinlar va animatsiyalar paydo bo‘ladi.",
    "en": "JavaScript makes websites interactive: buttons respond to clicks, text changes, and menus, games, and animations appear."
  },
  "Запомни:": {
    "uz": "Yodda tut:",
    "en": "Remember:"
  },
  "Проверь себя": {
    "uz": "O‘zingni tekshir",
    "en": "Test yourself"
  },
  "Твоё первое задание": {
    "uz": "Birinchi topshirig‘ing",
    "en": "Your first task"
  },
  "Открыть онлайн-редактор →": {
    "uz": "Onlayn muharrirni ochish →",
    "en": "Open online editor →"
  },
  "1. Основные HTML-теги": {
    "uz": "1. Asosiy HTML teglari",
    "en": "1. Basic HTML tags"
  },
  "Теги помогают браузеру понимать содержимое страницы.": {
    "uz": "Teglar brauzerga sahifa mazmunini tushunishga yordam beradi.",
    "en": "Tags help the browser understand page content."
  },
  "2. Структура HTML-документа": {
    "uz": "2. HTML hujjatining tuzilishi",
    "en": "2. HTML document structure"
  },
  "Каждая HTML-страница обычно начинается с такой структуры:": {
    "uz": "Har bir HTML sahifa odatda quyidagi tuzilishdan boshlanadi:",
    "en": "Every HTML page usually starts with this structure:"
  },
  "3. Для чего нужны основные теги?": {
    "uz": "3. Asosiy teglar nima uchun kerak?",
    "en": "3. What are the main tags for?"
  },
  "1. Как выглядит CSS-правило": {
    "uz": "1. CSS qoidasi qanday ko‘rinadi",
    "en": "1. What a CSS rule looks like"
  },
  "CSS состоит из правил. Каждое правило говорит браузеру: «найди вот такие элементы и оформи их вот так».": {
    "uz": "CSS qoidalardan iborat. Har bir qoida brauzerga qaysi elementlarni topish va ularni qanday bezashni aytadi.",
    "en": "CSS consists of rules. Each rule tells the browser which elements to find and how to style them."
  },
  "2. Как подключить CSS к странице": {
    "uz": "2. CSS ni sahifaga qanday ulash mumkin",
    "en": "2. How to add CSS to a page"
  },
  "3. Основные свойства": {
    "uz": "3. Asosiy xususiyatlar",
    "en": "3. Basic properties"
  },
  "4. Отступы и рамки": {
    "uz": "4. Bo‘shliqlar va chegaralar",
    "en": "4. Spacing and borders"
  },
  "5. Классы": {
    "uz": "5. Klasslar",
    "en": "5. Classes"
  },
  "1. Переменные": {
    "uz": "1. O‘zgaruvchilar",
    "en": "1. Variables"
  },
  "2. Типы данных": {
    "uz": "2. Ma’lumot turlari",
    "en": "2. Data types"
  },
  "3. Вывод в консоль": {
    "uz": "3. Konsolga chiqarish",
    "en": "3. Console output"
  },
  "4. Условия": {
    "uz": "4. Shartlar",
    "en": "4. Conditions"
  },
  "5. Функции": {
    "uz": "5. Funksiyalar",
    "en": "5. Functions"
  },
  "6. Работа со страницей": {
    "uz": "6. Sahifa bilan ishlash",
    "en": "6. Working with the page"
  },
  "7. Попробуй самостоятельно!": {
    "uz": "7. Mustaqil sinab ko‘r!",
    "en": "7. Try it yourself!"
  },
  "Умный помощник по программированию: объяснит тему, найдёт ошибку в коде и подскажет решение.": {
    "uz": "Dasturlash bo‘yicha aqlli yordamchi: mavzuni tushuntiradi, koddagi xatoni topadi va yechim taklif qiladi.",
    "en": "A smart programming assistant that explains topics, finds code errors, and suggests solutions."
  },
  "Модель:": {
    "uz": "Model:",
    "en": "Model:"
  },
  "🗑 Очистить чат": {
    "uz": "🗑 Suhbatni tozalash",
    "en": "🗑 Clear chat"
  },
  "Отправить": {
    "uz": "Yuborish",
    "en": "Send"
  },
  "Напиши свой вопрос...": {
    "uz": "Savolingizni yozing...",
    "en": "Type your question..."
  },
  "Enter — отправить, Shift+Enter — новая строка. ИИ может ошибаться, важное проверяй.": {
    "uz": "Enter — yuborish, Shift+Enter — yangi qator. AI xato qilishi mumkin, muhim ma’lumotlarni tekshiring.",
    "en": "Enter — send, Shift+Enter — new line. AI can make mistakes; verify important information."
  },
  "Проводник": {
    "uz": "Fayllar",
    "en": "Explorer"
  },
  "Квесты": {
    "uz": "Topshiriqlar",
    "en": "Challenges"
  },
  "Рабочая область": {
    "uz": "Ish maydoni",
    "en": "Workspace"
  },
  "Панель значков": {
    "uz": "Belgilar paneli",
    "en": "Activity bar"
  },
  "Боковая панель": {
    "uz": "Yon panel",
    "en": "Side panel"
  },
  "Верхняя строка с меню": {
    "uz": "Yuqori menyu paneli",
    "en": "Top menu bar"
  },
  "Строка состояния": {
    "uz": "Holat satri",
    "en": "Status bar"
  },
  "Стр 1, стлб 1": {
    "uz": "Qat 1, ust 1",
    "en": "Ln 1, Col 1"
  },
  "Пробелов: 4": {
    "uz": "Bo‘sh joylar: 4",
    "en": "Spaces: 4"
  },
  "⚡ Автозапуск: вкл": {
    "uz": "⚡ Avto-ishga tushirish: yoqilgan",
    "en": "⚡ Auto-run: on"
  },
  "✔ Проверить": {
    "uz": "✔ Tekshirish",
    "en": "✔ Check"
  },
  "🎯 Экзамен": {
    "uz": "🎯 Imtihon",
    "en": "🎯 Exam"
  },
  "Пропустить →": {
    "uz": "O‘tkazib yuborish →",
    "en": "Skip →"
  },
  "Завершить": {
    "uz": "Yakunlash",
    "en": "Finish"
  },
  "💡 Подсказка": {
    "uz": "💡 Maslahat",
    "en": "💡 Hint"
  },
  "↺ Сначала": {
    "uz": "↺ Boshidan",
    "en": "↺ Restart"
  },
  "🐞 Ошибка?": {
    "uz": "🐞 Xatolik?",
    "en": "🐞 Bug?"
  },
  "Предпросмотр": {
    "uz": "Oldindan ko‘rish",
    "en": "Preview"
  },
  "ПРОБЛЕМЫ": {
    "uz": "MUAMMOLAR",
    "en": "PROBLEMS"
  },
  "ПРОВЕРКА": {
    "uz": "TEKSHIRUV",
    "en": "CHECKS"
  },
  "КОНСОЛЬ": {
    "uz": "KONSOL",
    "en": "CONSOLE"
  },
  "📚 Шпаргалка": {
    "uz": "📚 Qo‘llanma",
    "en": "📚 Cheatsheet"
  },
  "Теги, свойства и команды в одном месте. Нажми «Попробовать», чтобы запустить пример в редакторе.": {
    "uz": "Teglar, xususiyatlar va buyruqlar bir joyda. Namunani muharrirda ishga tushirish uchun «Sinab ko‘rish»ni bosing.",
    "en": "Tags, properties, and commands in one place. Click “Try” to run an example in the editor."
  },
  "Твоё имя:": {
    "uz": "Ismingiz:",
    "en": "Your name:"
  },
  "🖨 Сохранить как PDF / печать": {
    "uz": "🖨 PDF sifatida saqlash / chop etish",
    "en": "🖨 Save as PDF / Print"
  },
  "СЕРТИФИКАТ": {
    "uz": "SERTIFIKAT",
    "en": "CERTIFICATE"
  },
  "подтверждает, что": {
    "uz": "tasdiqlaydiki,",
    "en": "certifies that"
  },
  "Ученик Programer Help": {
    "uz": "Programer Help o‘quvchisi",
    "en": "Programer Help student"
  },
  "Дата:": {
    "uz": "Sana:",
    "en": "Date:"
  },
  "Связаться с нами": {
    "uz": "Biz bilan bog‘laning",
    "en": "Contact us"
  },
  "Оставьте сообщение, и мы ответим вам в ближайшее время.": {
    "uz": "Xabar qoldiring, tez orada javob beramiz.",
    "en": "Leave a message and we will reply soon."
  },
  "Ваше имя": {
    "uz": "Ismingiz",
    "en": "Your name"
  },
  "Электронная почта": {
    "uz": "Elektron pochta",
    "en": "Email"
  },
  "Сообщение": {
    "uz": "Xabar",
    "en": "Message"
  },
  "Отправить сообщение": {
    "uz": "Xabarni yuborish",
    "en": "Send message"
  },
  "© 2026 My Web Site. Все права защищены.": {
    "uz": "© 2026 My Web Site. Barcha huquqlar himoyalangan.",
    "en": "© 2026 My Web Site. All rights reserved."
  },

  "Мы стремимся делать сложные технологии простыми и понятными для каждого, помогая как новичкам, так и опытным специалистам находить вдохновение и готовые решения для повседневных задач.": {"uz": "Biz murakkab texnologiyalarni hamma uchun sodda va tushunarli qilishga intilamiz. Yangi boshlovchilar va tajribali mutaxassislar bu yerda ilhom va kundalik vazifalar uchun tayyor yechimlarni topishlari mumkin.", "en": "We aim to make complex technologies simple and clear for everyone, helping beginners and experienced specialists find inspiration and practical solutions."},
  "Изучи основы HTML и научись создавать структуру сайтов.": {"uz": "HTML asoslarini o‘rgan va sayt tuzilishini yaratishni boshlashni.", "en": "Learn HTML basics and create website structures."},
  "Научись оформлять сайты, добавлять цвета и создавать дизайн.": {"uz": "Saytlarni bezash, ranglar va dizayn yaratishni o‘rgan.", "en": "Learn to style websites, add colors, and create designs."},
  "Добавляй интерактивность и функциональность на свои сайты.": {"uz": "Saytlaringga interaktivlik va funksionallik qo‘sh.", "en": "Add interactivity and functionality to your websites."},
  "Задачи 🧮": {"uz": "Masalalar 🧮", "en": "Challenges 🧮"},
  "Олимпиадные задачи на условия: напиши функцию, а сайт проверит её по тестам.": {"uz": "Shartlarga oid olimpiada masalalari: funksiya yozing, sayt uni testlar orqali tekshiradi.", "en": "Olympiad-style problems: write a function and the site will test it."},
  "Решать задачи": {"uz": "Masalalarni yechish", "en": "Solve challenges"},
  "Функции 🔧": {"uz": "Funksiyalar 🔧", "en": "Functions 🔧"},
  "Учись писать свои функции: от квадрата числа до чисел Фибоначчи.": {"uz": "O‘z funksiyalaringizni yozishni o‘rganing: son kvadratidan Fibonachchi sonlarigacha.", "en": "Learn to write your own functions, from squaring numbers to Fibonacci numbers."},
  "Начать": {"uz": "Boshlash", "en": "Start"},
  "Всего выполнено: ": {"uz": "Jami bajarildi: ", "en": "Total completed: "},
  "Выполнено: ": {"uz": "Bajarildi: ", "en": "Completed: "},
  "✅ Пройдено: ": {"uz": "✅ O‘tildi: ", "en": "✅ Completed: "},
  " из ": {"uz": " / ", "en": " of "},
  "Уроки программирования": {"uz": "Dasturlash darslari", "en": "Programming lessons"},
};
const languages=["ru","uz","en"]; const labels={ru:"RU",uz:"UZ",en:"EN"};
let current=localStorage.getItem("programerhelp_language")||"ru"; if(!languages.includes(current)) current="ru";
const originalText=new WeakMap(), originalAttrs=new WeakMap();
function translateNode(node){if(!originalText.has(node)) originalText.set(node,node.nodeValue); const raw=originalText.get(node); const key=raw.trim(); if(!key||!dictionary[key]) return; const value=current==="ru"?key:dictionary[key][current]; if(value!==undefined){const lead=raw.match(/^\s*/)[0], tail=raw.match(/\s*$/)[0]; const translated=lead+value+tail; if(node.nodeValue!==translated) node.nodeValue=translated;}}
function translateAttr(el){["placeholder","title","aria-label","value"].forEach(a=>{if(!el.hasAttribute||!el.hasAttribute(a))return; let saved=originalAttrs.get(el); if(!saved){saved={};originalAttrs.set(el,saved);} if(saved[a]===undefined)saved[a]=el.getAttribute(a); const key=saved[a]; if(dictionary[key])el.setAttribute(a,current==="ru"?key:dictionary[key][current]);});}
function translateTree(root){if(!root)return; if(root.nodeType===Node.TEXT_NODE){if(!root.parentElement?.closest("script,style,code,pre,textarea,#ph-language-switch"))translateNode(root);return;} if(root.nodeType!==Node.ELEMENT_NODE && root!==document)return; if(root.nodeType===Node.ELEMENT_NODE){if(root.closest("#ph-language-switch")||root.matches("script,style,code,pre,textarea"))return;translateAttr(root);} const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return n.parentElement&&!n.parentElement.closest("script,style,code,pre,textarea,#ph-language-switch")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}}); let n;while(n=walker.nextNode())translateNode(n); if(root.querySelectorAll)root.querySelectorAll("[placeholder],[title],[aria-label],input[type=submit],input[type=button]").forEach(translateAttr);}
function apply(){document.documentElement.lang=current; if(!window.__phTitle)window.__phTitle=document.title; const title=window.__phTitle.trim(); if(dictionary[title])document.title=current==="ru"?title:dictionary[title][current]; translateTree(document.body); document.querySelectorAll("#ph-language-switch button").forEach(b=>{b.classList.toggle("active",b.dataset.lang===current);b.setAttribute("aria-pressed",String(b.dataset.lang===current));});}
function ensureSiteNav(){
 let nav=document.querySelector("nav");
 if(!nav){
  nav=document.createElement("nav"); nav.id="ph-site-nav";
  nav.innerHTML='<a href="index.html">Главная</a><a href="lessons.html">Уроки</a><a href="cheatsheet.html">Шпаргалка</a><a href="ai.html">Programer AI</a><a href="about.html">О сайте</a><a href="help.html">Помощь</a><a href="contacts.html">Контакты</a>';
  document.body.insertBefore(nav,document.body.firstChild);
 }
 const page=location.pathname.split("/").pop()||"index.html";
 nav.querySelectorAll("a[href]").forEach(a=>{
  const target=a.getAttribute("href").split("#")[0];
  a.classList.toggle("active",target===page);
 });
 if(!document.getElementById("ph-site-nav-style")){
  const st=document.createElement("style"); st.id="ph-site-nav-style";
  st.textContent='#ph-site-nav{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px;padding:12px 16px;position:relative;z-index:1000;background:#0f172a;font:600 14px Arial,sans-serif}#ph-site-nav a{color:#fff;text-decoration:none;padding:7px 2px;border-bottom:2px solid transparent}#ph-site-nav a.active{border-bottom-color:#3b82f6;color:#93c5fd}';
  document.head.appendChild(st);
 }
}
function init(){
 ensureSiteNav();
 if(document.getElementById("ph-language-switch"))return;const box=document.createElement("div");box.id="ph-language-switch";box.setAttribute("aria-label","Choose language");box.innerHTML=languages.map(l=>`<button type="button" data-lang="${l}">${labels[l]}</button>`).join("");box.addEventListener("click",e=>{const b=e.target.closest("button[data-lang]");if(!b)return;current=b.dataset.lang;localStorage.setItem("programerhelp_language",current);apply();});const style=document.createElement("style");style.textContent=`#ph-language-switch{position:fixed;top:auto;right:auto;left:245px;bottom:16px;z-index:2147483000;display:flex;gap:3px;padding:4px;background:#0f172a;border:1px solid rgba(148,163,184,.35);border-radius:10px;box-shadow:0 4px 16px rgba(15,23,42,.22);font:600 12px/1 Arial,sans-serif}#ph-language-switch button{border:0;border-radius:7px;background:transparent;color:#cbd5e1;padding:7px 9px;cursor:pointer;font:inherit}#ph-language-switch button:hover{background:#334155;color:#fff}#ph-language-switch button.active{background:#2563eb;color:#fff}@media(max-width:640px){#ph-language-switch{top:auto;left:auto;right:12px;bottom:16px}#ph-language-switch button{padding:7px 8px}}`;document.head.appendChild(style);document.body.appendChild(box);apply();const observer=new MutationObserver(records=>records.forEach(r=>{if(r.type==="characterData")translateNode(r.target);r.addedNodes.forEach(n=>translateTree(n));}));observer.observe(document.body,{childList:true,subtree:true,characterData:true});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

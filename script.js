'use strict'

let body = document.querySelector('body');

// #1 Восстановить порядок книг.
let booksContainer = body.querySelector('.books');
let books = body.querySelectorAll('.book');
books[0].before(books[1]);
books[2].before(books[4]);
booksContainer.append(books[2]);
books = body.querySelectorAll('.book'); // обновление после перемещения

// #2 Заменить картинку заднего фона на другую из папки image
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// #3 Исправить заголовок в книге 3 (Получится - "Книга 3. this и Прототипы Объектов")
books[2].querySelector('h2 a').textContent = 'Книга 3. this и Прототипы Объектов';

// #4 Удалить рекламу со страницы
let ad = body.querySelector('.adv');
ad.remove();

// #5 Восстановить порядок глав во второй и пятой книге(внимательно инспектируйте индексы элементов, поможет dev tools)
let book2Li = books[1].querySelectorAll('li');
book2Li[10].before(book2Li[2]);
book2Li[4].before(book2Li[6]);
book2Li[4].before(book2Li[8]);
book2Li = books[1].querySelectorAll('li'); // обновление после перемещения

let book5Li = books[4].querySelectorAll('li');
book5Li[2].before(book5Li[9]);
book5Li[2].before(book5Li[4]);
book5Li[4].before(book5Li[3]);
book5Li[8].before(book5Li[5]);
book5Li = books[4].querySelectorAll('li'); // обновление после перемещения

// #6 В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let book6Li = books[5].querySelectorAll('li');
let newChapter = book6Li[0].cloneNode(true);
newChapter.textContent = 'Глава 8: За пределами ES6';
book6Li[8].after(newChapter);
book6Li = books[5].querySelectorAll('li'); // обновление после перемещения
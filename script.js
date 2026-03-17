// БЛОК 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
let title = ' КаЛьКулятор Верстки' || prompt('Как называется ваш проект?');
let screens = 'all screens' || prompt('Какие типы экранов нужно разработать?', 'Simple, Complex, Interactive');
let screenPrice = 50000 || +prompt('Сколько будет стоить данная работа?');
let adaptive = true || confirm('Нужен ли адаптив?');

let service1 = 'почистить' || prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = 100 || +prompt('Сколько это будет стоить?');
let service2 = 'покрасить' || prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = 50 || +prompt('Сколько это будет стоить?');

let rollback = 20;

// БЛОК 2 ОПИСАНИЕ ФУНКЦИЙ
// function-expression
let getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2
};

// function-declaration
function getFullPrice(screenPrice, servicePrice1, servicePrice2) {
  return screenPrice + servicePrice1 + servicePrice2
}

function getTitle() {
  let trimTitle = title.trim();
  let firstLetter = trimTitle.substring(0, 1).toUpperCase();
  let leftoverLetters = trimTitle.substring(1).toLowerCase();
  return title = firstLetter + leftoverLetters
}

function getServicePercentPrices(fullPrice, rollback) {
  return Math.round(fullPrice - rollback)
}

let showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

let gettRollbackMessage = function (price) {
  switch (true) {
    case (price >= 30000):
      return 'Даем скидку 10%.';
      break
    case (price >= 15000):
      return 'Даем скидку 5%.';
      break
    case (price >= 0):
      return 'Скидка не предусмотрена.';
      break
    default:
      return 'Что-то пошло не так';
  }
}

// БЛОК 3 ФУНКЦИОНАЛ
getTitle();
let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
let fullPrice = getFullPrice(screenPrice, servicePrice1, servicePrice2);
let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

// БЛОК 4 ВЫВОД В КОНСОЛЬ
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.length);

console.log(gettRollbackMessage(fullPrice));

console.log(servicePercentPrice);
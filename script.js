let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Simple, Complex, Interactive');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let rollback = 20;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.round(fullPrice - rollback);
console.log('fullPrice: ', fullPrice, '\nservicePercentPrice: ', servicePercentPrice);

switch (true) {
  case (fullPrice >= 30000):
    console.log('Даем скидку 10%.');
    break
  case (fullPrice >= 15000):
    console.log('Даем скидку 5%.');
    break
  case (fullPrice >= 0):
    console.log('Скидка не предусмотрена.');
    break
  default:
    console.log('Что-то пошло не так');
}
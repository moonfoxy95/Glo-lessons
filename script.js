'use strict'

// БЛОК 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

let rollback = 20;

// БЛОК 2 ОПИСАНИЕ ФУНКЦИЙ
let isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

let asking = function () {
  title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Simple, Complex, Interactive');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?')
  } while (!isNumber(screenPrice));

  screenPrice = +screenPrice;

  adaptive = true || confirm('Нужен ли адаптив?');
}

// function-expression
let getAllServicePrices = function () {

  let servicePrice;
  let sum = 0;

  for (let i = 1; i < 3; i++) {

    if (i === 1) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'почистить');
    } else if (i === 2) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'покрасить');
    }

    do {
      servicePrice = prompt('Сколько услуга ' + i + ' будет стоить?');
    } while (!isNumber(servicePrice));

    sum += +servicePrice;
  }

  return sum;
};

// function-declaration
function getFullPrice(screenPrice, servicePrices) {
  return screenPrice + servicePrices;
}

function getTitle(title) {
  let trimTitle = title.trim();
  let firstLetter = trimTitle.substring(0, 1).toUpperCase();
  let leftoverLetters = trimTitle.substring(1).toLowerCase();
  return title = firstLetter + leftoverLetters;
}

function getServicePercentPrices(fullPrice, rollback) {
  return fullPrice - (fullPrice * (rollback / 100));
}

let showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

let getRollbackMessage = function (price) {
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
asking();
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

// БЛОК 4 ВЫВОД В КОНСОЛЬ
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('screens.length: ', screens.length);

console.log(getRollbackMessage(fullPrice));

console.log('allServicePrices: ', allServicePrices);
console.log('servicePercentPrice: ', servicePercentPrice);

console.log('Стоимость экранов: ' + screenPrice + '\nСтоимость сайта: ' + fullPrice)
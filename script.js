'use strict'

// БЛОК 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
let appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  rollback: 10,
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Simple, Complex, Interactive');

    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?')
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = +appData.screenPrice;

    appData.adaptive = true || confirm('Нужен ли адаптив?');
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {

    let sum = 0;

    for (let i = 1; i < 3; i++) {
      let servicePrice;

      if (i === 1) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'почистить');
      } else if (i === 2) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'покрасить');
      }

      do {
        servicePrice = prompt('Сколько услуга ' + i + ' будет стоить?');
      } while (!appData.isNumber(servicePrice));

      sum += +servicePrice;
    }

    return sum;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function (title) {
    let trimTitle = title.trim();
    let firstLetter = trimTitle.substring(0, 1).toUpperCase();
    let leftoverLetters = trimTitle.substring(1).toLowerCase();
    return firstLetter + leftoverLetters;
  },
  getServicePercentPrices: function () {
    return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },
  getRollbackMessage: function (price) {
    switch (true) {
      case (price >= 30000):
        return 'Даем скидку 10%.';
      case (price >= 15000):
        return 'Даем скидку 5%.';
      case (price >= 0):
        return 'Скидка не предусмотрена.';
      default:
        return 'Что-то пошло не так';
    }
  },
  logger: function () {
    console.log('appData: ', appData);
    for (let property in appData) {
      console.log(`${property} (${typeof (appData[property])})`);
    }
  },
  start: function () {
    appData.asking();
    appData.title = appData.getTitle(appData.title);
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.logger();
  },
}

// БЛОК 2 ОПИСАНИЕ ФУНКЦИЙ

// БЛОК 3 ФУНКЦИОНАЛ
appData.start();

// БЛОК 4 ВЫВОД В КОНСОЛЬ
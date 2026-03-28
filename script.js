'use strict'

// БЛОК 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
let appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  rollback: 10,
  asking: function () {
    do {
      appData.title = prompt('Как называется ваш проект?', ' КаЛьКулятор Верстки');
    } while (!appData.isString(appData.title));

    appData.screenPrice = +appData.screenPrice;

    appData.adaptive = true || confirm('Нужен ли адаптив?');

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько будет стоить данная работа?')
      } while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name: name,
        price: +price,
      })
    }

    for (let i = 1; i < 3; i++) {
      let name;
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?', 'почистить');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько услуга ' + i + ' будет стоить?');
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (str) {
    return !isFinite(str) && str.trim() !== '';
  },
  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function () {
    let trimTitle = appData.title.trim();
    let firstLetter = trimTitle.substring(0, 1).toUpperCase();
    let leftoverLetters = trimTitle.substring(1).toLowerCase();
    appData.title = firstLetter + leftoverLetters;
  },
  getServicePercentPrice: function () {
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
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
    appData.addPrices();
    appData.getTitle();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.logger();
  },
}

// БЛОК 2 ОПИСАНИЕ ФУНКЦИЙ

// БЛОК 3 ФУНКЦИОНАЛ
appData.start();

// БЛОК 4 ВЫВОД В КОНСОЛЬ
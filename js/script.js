'use strict'

// БЛОК 1 ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
let title = document.getElementsByTagName('h1')[0];
//let buttons = document.getElementsByClassName('handler_btn');
let buttonCalculate = document.getElementsByClassName('handler_btn')[0];
let buttonReset = document.getElementsByClassName('handler_btn')[1];
let buttonPlus = document.querySelector('.screen-btn');
let itemsPercent = document.querySelectorAll('.other-items.percent');
let itemsNumber = document.querySelectorAll('.other-items.number');
let inputRange = document.querySelector('.rollback input[type="range"]');
let spanRange = document.querySelector('.rollback span.range-value');

let total = document.getElementsByClassName('total-input')[0];
let totalCount = document.getElementsByClassName('total-input')[1];
let totalCountOther = document.getElementsByClassName('total-input')[2];
let fullTotalCount = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let screenElemsParent = document.querySelectorAll('.main-controls__views.element')[0];
let screenElems = document.querySelectorAll('.screen');

let appData = {
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  init: function () {
    appData.addTitle();
    buttonCalculate.addEventListener('click', appData.calculate);
    buttonPlus.addEventListener('click', appData.addScreenBlock);

    buttonCalculate.disabled = true;
    buttonCalculate.style.backgroundColor = 'grey';
    screenElemsParent.addEventListener('input', appData.validateScreen);

    inputRange.addEventListener('input', appData.updateRange);
  },
  resetValues: function () {
    appData.screens = [];
    appData.screensCount = 0;
    appData.screenPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
  },
  updateRange: function () {
    spanRange.textContent = inputRange.value + '%';
    appData.rollback = +inputRange.value;
  },
  validateScreen: function () {
    screenElems = document.querySelectorAll('.screen');

    for (let screenElem of screenElems) {
      let select = screenElem.querySelector('select');
      let input = screenElem.querySelector('input');

      if (select.value === '' || input.value === '') {
        buttonCalculate.disabled = true;
        buttonCalculate.style.backgroundColor = 'grey';
        return;
      }
    }

    buttonCalculate.disabled = false;
    buttonCalculate.style.backgroundColor = 'revert-layer';
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addScreenBlock: function () {
    let cloneScreen = screenElems[0].cloneNode(true);
    cloneScreen.querySelector('input').value = null;
    buttonPlus.before(cloneScreen);
    appData.validateScreen();
  },
  addScreens: function () {
    screenElems = document.querySelectorAll('.screen');

    screenElems.forEach(function (screen, index) {
      let select = screen.querySelector('select');
      let input = screen.querySelector('input');

      let selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      })
    })
  },
  addServices: function () {
    itemsPercent.forEach(function (item) {
      let checkbox = item.querySelector('input[type="checkbox"]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type="text"]');

      if (checkbox.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    })

    itemsNumber.forEach(function (item) {
      let checkbox = item.querySelector('input[type="checkbox"]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type="text"]');

      if (checkbox.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addPrices: function () {
    // appData.screenPrice = appData.screens.reduce(function (acc, item) {
    //   return acc.price + item.price;
    // })

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    for (let screen of appData.screens) {
      appData.screensCount += +screen.count;
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
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
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screensCount;
  },
  logger: function () {
    console.log('appData: ', appData);
  },
  calculate: function () {
    appData.resetValues();
    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    appData.logger();
    appData.showResult();
  },
}

// БЛОК 2 ОПИСАНИЕ ФУНКЦИЙ

// БЛОК 3 ФУНКЦИОНАЛ
appData.init();

// БЛОК 4 ВЫВОД В КОНСОЛЬ
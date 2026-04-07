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

let checkboxCms = document.querySelector('#cms-open');
let windowCms = document.querySelector('.hidden-cms-variants');
let selectCms = windowCms.querySelector('select');
let inputCmsOther = windowCms.querySelector('.main-controls__input');
let inputCmsOtherInput = windowCms.querySelector('.main-controls__input input');

let appData = {
  title: '',
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  cmsPrice: 1,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  init: function () {
    this.addTitle();
    this.toggleInputState(buttonCalculate, 'disable');
    buttonCalculate.addEventListener('click', appData.calculate.bind(appData));
    buttonReset.addEventListener('click', appData.resetForm.bind(appData));
    buttonPlus.addEventListener('click', appData.addScreenBlock.bind(appData));
    screenElemsParent.addEventListener('input', appData.validateScreen.bind(appData));
    inputRange.addEventListener('input', appData.updateRange.bind(appData));
    checkboxCms.addEventListener('click', appData.openCms.bind(appData));
    windowCms.addEventListener('change', appData.getCmsPrice.bind(appData));
  },
  getCmsPrice: function () {
    this.openCmsOther();
    if (selectCms.options[selectCms.selectedIndex].textContent === 'Другое') {
      this.cmsPrice = +inputCmsOtherInput.value || 1;
    } else {
      this.cmsPrice = +selectCms.options[selectCms.selectedIndex].value || 1;
    }
  },
  openCmsOther: function () {
    if (selectCms.value === 'other') {
      inputCmsOther.style.display = 'block';
    } else {
      inputCmsOther.style.display = 'none';
    }
  },
  openCms: function () {
    if (checkboxCms.checked) {
      windowCms.style.display = 'flex';
    } else {
      windowCms.style.display = 'none';
    }
  },
  blockInputs: function () {
    let screenInputsAndSelects = screenElemsParent.querySelectorAll('select, input');
    let leftCheckboxes = document.querySelectorAll('.main-controls input[type="checkbox"], .main-controls input[type="range"]');

    screenInputsAndSelects.forEach((item) => {
      this.toggleInputState(item, 'disable');
    })

    leftCheckboxes.forEach((item) => {
      this.toggleInputState(item, 'disable');
    })
  },
  unblockInputs: function () {
    let screenInputsAndSelects = screenElemsParent.querySelectorAll('select, input');
    let leftCheckboxes = document.querySelectorAll('.main-controls input[type="checkbox"], .main-controls input[type="range"]')

    screenInputsAndSelects.forEach((item) => {
      this.toggleInputState(item, 'enable');
    })

    leftCheckboxes.forEach((item) => {
      this.toggleInputState(item, 'enable');
    })
  },
  toggleInputState: function (input, state) {
    let states = {
      enable: {
        disabled: false,
        backgroundColor: 'revert-layer',
        color: 'revert-layer',
        cursor: 'revert-layer',
      },
      disable: {
        disabled: true,
        backgroundColor: 'grey',
        color: 'floralwhite',
        cursor: 'not-allowed',
      }
    }

    for (let property in states[state]) {
      if (property === 'disabled') {
        input.disabled = states[state][property];
      } else {
        input.style[property] = states[state][property];
      }
    }
  },
  resetForm: function () {
    this.unblockInputs();
    this.updateAfterReset();
    this.resetValues();
    this.resetCms();
    this.showResult();
    buttonCalculate.style.display = 'block';
    buttonReset.style.display = 'none';

    this.logger();
  },
  resetCms: function () {
    selectCms.selectedIndex = 0;
    this.cmsPrice = 1;
    inputCmsOther.style.display = 'none';
  },
  resetValues: function () {
    this.screens = [];
    this.screensCount = 0;
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },
  updateRange: function () {
    spanRange.textContent = inputRange.value + '%';
    this.rollback = +inputRange.value;
  },
  validateScreen: function () {
    screenElems = document.querySelectorAll('.screen');

    for (let screenElem of screenElems) {
      let select = screenElem.querySelector('select');
      let input = screenElem.querySelector('input');

      if (select.value === '' || input.value === '') {
        this.toggleInputState(buttonCalculate, 'disable');
        return;
      }
    }

    this.toggleInputState(buttonCalculate, 'enable');
  },
  addTitle: function () {
    document.title = title.textContent;
    this.title = title.textContent;
  },
  updateAfterReset: function () {
    // screen
    let cloneScreen = screenElems[0].cloneNode(true);

    screenElems.forEach((elem) => {
      elem.remove();
    })

    buttonPlus.before(cloneScreen);
    cloneScreen.querySelector('input').value = null;
    this.validateScreen();

    // select
    let allCheckboxes = document.querySelectorAll('.main-controls input[type="checkbox"]');
    allCheckboxes.forEach((item) => {
      item.checked = false;
    });

    // range
    inputRange.value = 0;
    this.updateRange();
  },
  addScreenBlock: function () {
    let cloneScreen = screenElems[0].cloneNode(true);
    cloneScreen.querySelector('input').value = null;
    buttonPlus.before(cloneScreen);
    this.validateScreen();
  },
  addScreens: function () {
    screenElems = document.querySelectorAll('.screen');

    screenElems.forEach((screen, index) => {
      let select = screen.querySelector('select');
      let input = screen.querySelector('input');

      let selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      })
    })
  },
  addServices: function () {
    itemsPercent.forEach((item) => {
      let checkbox = item.querySelector('input[type="checkbox"]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type="text"]');

      if (checkbox.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })

    itemsNumber.forEach((item) => {
      let checkbox = item.querySelector('input[type="checkbox"]');
      let label = item.querySelector('label');
      let input = item.querySelector('input[type="text"]');

      if (checkbox.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addPrices: function () {
    // appData.screenPrice = appData.screens.reduce(function (acc, item) {
    //   return acc.price + item.price;
    // })

    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    for (let screen of this.screens) {
      this.screensCount += +screen.count;
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice + (this.fullPrice * (this.cmsPrice / 100));
    totalCountRollback.value = Math.round(this.servicePercentPrice);
    totalCount.value = this.screensCount;
  },
  logger: function () {
    console.log('appData: ', this);
  },
  calculate: function () {
    this.blockInputs();
    this.resetValues();
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    buttonCalculate.style.display = 'none';
    buttonReset.style.display = 'block';

    this.logger();
  },
}

// БЛОК 2 ОПИСАНИЕ ФУНКЦИЙ

// БЛОК 3 ФУНКЦИОНАЛ
appData.init();

// БЛОК 4 ВЫВОД В КОНСОЛЬ
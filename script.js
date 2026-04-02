let button = document.body.querySelector('#btn');
let circleButton = document.body.querySelector('#e_btn');
let input = document.body.querySelector('#text');
let range = document.body.querySelector('#range');
let rangeSpan = document.body.querySelector('#range-span');
let square = document.body.querySelector('#square');
let circle = document.body.querySelector('#circle');

let backgroundColorChange = function () {
  square.style.backgroundColor = input.value;
};

let resize = function () {
  rangeSpan.textContent = range.value;
  circle.style.width = circle.style.height = range.value + '%';
}

// Задача 1
button.addEventListener('click', backgroundColorChange);

// Задача 2
circleButton.style.display = 'none';

// Задача 3
range.addEventListener('input', resize);
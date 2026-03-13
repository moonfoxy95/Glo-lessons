let title = 'Project';
let screens = 'Simple, Complex, Interactive';
let screenPrice = 210;
let rollback = 10;
let fullPrice = 310;
let adaptive = true;

console.log(typeof (title), typeof (fullPrice), typeof (adaptive));
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей.\nСтоимость разработки сайта ${fullPrice} рублей.`)
console.log(screens.toLocaleLowerCase().split(','));
console.log(fullPrice * (rollback / 100));
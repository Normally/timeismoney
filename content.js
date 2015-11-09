// Time is money
console.log("Time is money extension is running.");

var re_2dp = /\£\d+\.\d{2}/;
var re_0dp = /\£\d+/;
var re_strip = /[^0-9.]/g;
var elements = document.getElementsByTagName('*');
var hoursPerDay = 8;
var yearlyWage = 22044; // https://en.wikipedia.org/wiki/Income_in_the_United_Kingdom

// Set the day threshold to the number of hours per day worked
moment.relativeTimeThreshold('h', hoursPerDay);

var oneSecondWage = function() {
  var weeklyWage = yearlyWage/52;
  var dailyWage = weeklyWage/5;
  var oneHourWage = dailyWage/hoursPerDay;
  var wagePerSecond = oneHourWage/60/60;
  return wagePerSecond;
};

function convertMoneyToTime(money) {
  var doubleMoney = parseInt(money);
  var numberOfSeconds = doubleMoney/oneSecondWage();
  var string = moment.duration(numberOfSeconds, "seconds").humanize();
  return string;
}

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var money;

            // if text is money, do it!
            if (re_2dp.test(text) || re_0dp.test(text)) {

              var withoutCommas = text.replace(/,/g, '');
              var launderedMoney = withoutCommas.replace(re_strip, '');

              time = convertMoneyToTime(launderedMoney);
              element.replaceChild(document.createTextNode(time), node);
            }
        }
    }
}

// Time is money

var settings = {};
settings.hoursPerDay = 8;
settings.yearlyWage = 22044;

settings.setHoursPerDay = function(hoursPerDay) {
  settings.hoursPerDay = hoursPerDay;
}

settings.setYearlyWage = function(yearlyWage) {
  settings.yearlyWage = yearlyWage;
  // https://en.wikipedia.org/wiki/Income_in_the_United_Kingdom
}

// Set the day threshold to the number of hours per day worked
moment.relativeTimeThreshold('h', settings.hoursPerDay);

var oneSecondWage = function() {
  var weeklyWage = settings.yearlyWage/52;
  var dailyWage = weeklyWage/5;
  var oneHourWage = dailyWage/settings.hoursPerDay;
  var wagePerSecond = oneHourWage/60/60;
  return wagePerSecond;
};

function convertMoneyToTime(money) {
  var doubleMoney = parseInt(money);
  var numberOfSeconds = doubleMoney/oneSecondWage();
  var string = moment.duration(numberOfSeconds, "seconds").humanize();
  return string;
}

function replaceMoneyWithTime(text) {
  var re = /\£\d{0,3}(,?\d+)?(.?\d+)/;
  var re_strip = /[^0-9.]/g;
  var result;
  var matches  = re.exec(text);
  if (matches) {
    var match = matches[0];
    var cleaned = match.replace(re_strip, '');
    var time = convertMoneyToTime(cleaned);
    result = matches.input.replace(match, time);
  }
  else { result = text; }
  return result;
}

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
  var element = elements[i];

  for (var j = 0; j < element.childNodes.length; j++) {
    var node = element.childNodes[j];

    if (node.nodeType === 3) {
      var text = node.nodeValue;
      updatedText = replaceMoneyWithTime(text);
      if (updatedText != text) {
        element.replaceChild(document.createTextNode(updatedText), node);
      }
    }
  }
}

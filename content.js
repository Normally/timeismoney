// Time is money

// TODO: do a proper export so we're not using globals
var settings = {
  yearlyWage: 100000,
  tax: 0,
  workingDays: 5,
  workingHours: 8
};

settings.setHoursPerDay = function(hoursPerDay) {
  settings.hoursPerDay = hoursPerDay;
}

settings.setYearlyWage = function(yearlyWage) {
  settings.yearlyWage = yearlyWage;
}

var oneSecondWage = function() {
  return (settings.yearlyWage * (1 - settings.tax)) / (settings.workingDays * 52) / settings.workingHours / 60 / 60;
};

// d is seconds in that value, set for 5 days a week, 8 hours a day

var offsets = {
  year: {
    d: 3600*settings.workingHours*settings.workingDays*52, //365 days is 31536000,
    max: Infinity
  },
  month: {
    d: Math.round(3600*settings.workingHours*settings.workingDays*4.333333),
    max: 10
  },
  week: {
    d: 3600*settings.workingHours*settings.workingDays,
    max: 3
  },
  day: {
    d: 3600*settings.workingHours,
    max: 3
  },
  hour: {
    d: 3600,
    max: 6
  },
  minute: {
    d: 60,
    max: 50
  },
  second: {
    d: 1,
    max: 50
  }
};

var moneyToTime = function(money) {
  var delta = parseFloat(money) / oneSecondWage(),
    arr = [],
    str = "",
    count = 0,
    flag;

  // Calculate exact year, months, weeks, days etc... push them into an array.

  for (var key in offsets) {
    var value = Math.floor(delta / offsets[key].d);
    var obj = {
      key: key,
      value: value
    };
    arr.push(obj);
    delta -= value * offsets[key].d;
  };

  // Round up values according to max, rounding down is not nessecary due to the way we read them back later.

  for (var i = arr.length - 1; i >= 0; i--) {
    var a = arr[i];
    if (a.value > offsets[a.key].max) {
      arr[i - 1].value += 1;
      a.value = 0;
    }
  }

  // Loop through and pick just one or two of the highest values

  for (var key in arr) {
    var k = arr[key];
    if ((flag && !k.value) || (flag && count > 1)) {
      break;
    }
    if (k.value) {
      str += (count > 0 ? ", " : "") + k.value + " " + k.key + (k.value > 1 ? 's' : '');
      flag = true;
      count++;
    }
  };
  // say 'a' instead of 1 for single values
  if (str.charAt(0) === '1' && count < 2) {
    str = 'a' + str.substring(1);
  }
  return str;
};

function convertMoneyToSeconds(money) {
  var doubleMoney = parseInt(money);
  seconds = doubleMoney/oneSecondWage();
  return Math.ceil(seconds);
};

function replaceMoneyWithTime(text) {
  var re = /\£\d{0,3}(,?\d+)?(.?\d+)(K|k|M|m)?/; // http://regexr.com/3cduh
  var re_strip = /[^0-9.kKmM]/g;
  var result;
  var matches  = re.exec(text);
  if (matches) {
    var match = matches[0];
    var cleaned = match.replace(re_strip, '');
    if (/(k|K)$/.test(cleaned)) {
      cleaned = cleaned.replace(/(k|K)$/, '');
      cleaned = parseInt(cleaned) * Math.pow(10,3);
    } else if (/(m|M)$/.test(cleaned)) {
      cleaned = cleaned.replace(/(m|M)$/, '');
      cleaned = parseInt(cleaned) * Math.pow(10,6);
    }
    var time = moneyToTime(cleaned);
    result = matches.input.replace(match, time);
  }
  else { result = text; }
  return result;
};

function addStyles() {
  var css = 'span.timeIsMoney { all: inherit!important; border-bottom-style: dotted!important; border-bottom-width: 2px!important; padding: 0!important; margin: 0!important; list-style-type: none!important; list-style-image: none!important; position: relative!important; cursor: pointer!important; } span.timeIsMoney-tooltip { display: none; position: absolute; top: 10px; left: 10px; padding: 10px; background-color: #50E3C2; opacity: 0.9; color: black; z-index: 100000; border-radius: 4px; } span.timeIsMoney:hover > span.timeIsMoney-tooltip { display: block!important; }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
};

function run() {
  var elements = document.querySelectorAll('*');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var color = window.getComputedStyle(element).color;
        updatedText = replaceMoneyWithTime(text);
        if (updatedText != text) {
          var span = document.createElement("span");
          var tooltip = document.createElement("span");
          // class names
          span.className = "timeIsMoney";
          tooltip.className = "timeIsMoney-tooltip";
          // border
          span.style.borderColor = color;
          // content
          var content = document.createTextNode(updatedText);
          var tooltipContent = document.createTextNode(text);
          var tooltipWithContent = tooltip.appendChild(tooltipContent);
          span.appendChild(content);
          span.appendChild(tooltip);
          element.replaceChild(span, node);
        }
      }
    }
  }
};

function getSettings(callback) {
  if (typeof chrome == "undefined" || typeof chrome.storage == "undefined") {
    callback();
  }
  else {
    chrome.storage.sync.get({
      yearlySalary: '22000'
    }, function(items) {
      settings.setYearlyWage(items.yearlySalary);
      callback(); // run the code after we've got the settings
    });
  }
}

addStyles();
getSettings(run);

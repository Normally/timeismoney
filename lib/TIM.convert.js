TIM.convert = (function() {

  var offsets = {
    yr: {
      d: 3600*TIM.settings.values.workingHours*TIM.settings.values.workingDays*52, //365 days is 31536000,
      total: Infinity
    },
    mo: {
      d: Math.round(3600*TIM.settings.values.workingHours*TIM.settings.values.workingDays*4.333333),
      total: 12
    },
    wk: {
      d: 3600*TIM.settings.values.workingHours*TIM.settings.values.workingDays,
      total: 4.333333333 // Weeks in a month
    },
    d: {
      d: 3600*TIM.settings.values.workingHours,
      total: TIM.settings.values.workingDays
    },
    hr: {
      d: 3600,
      total: TIM.settings.values.workingHours
    },
    min: {
      d: 60,
      total: 60
    },
    sec: {
      d: 1,
      total: 60
    }
  };

  var oneSecondWage = function() {
    return (TIM.settings.values.monthlyWage * 12) / (TIM.settings.values.workingDays * 52) / TIM.settings.values.workingHours / 60 / 60;
  };

  // d is seconds in that value, set for 5 days a week, 8 hours a day
  var moneyToTime = function(money) {
    var delta = parseFloat(money) / oneSecondWage(),
      arr = [],
      str = "",
      count = 0;

    // Calculate exact year, months, weeks, days etc... push them into an array.

    for (var key in offsets) {
      var value = Math.floor(delta / offsets[key].d);
      var obj = {
        key: key,
        value: value
      };
      arr.push(obj);
      delta -= value * offsets[key].d;
    }

    // Round up values according to max, rounding down is not nessecary due to the way we read them back later.

    for (var i = arr.length - 1; i >= 0; i--) {
      var a = arr[i];
      var dec = Math.round(a.value/offsets[a.key].total);
      if (dec) {
        arr[i - 1].value += 1;
        a.value = 0;
      }
    }

    // Loop through and pick just one or two of the highest values
    var value = 0, unit;
    for (var key in arr) {
      var k = arr[key];
      if ((count && !k.value) || (count > 1)) {
        break;
      }
      if (k.value) {
        if(count){
          var decimal = k.value/offsets[k.key].total;
          value = Math.round((value+decimal)*2)/2;
        }else{
          value += k.value;
          unit = k.key;
        }
        //str += (count > 0 ? ", " : "") + k.value + "" + k.key /*+ (k.value > 1 ? 's' : '')*/;
        count++;
      }
    }
    return (value+unit) || '0s';
  };

  var replaceMoneyWithTime = function(text) {
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

  return {
    moneyToTime:moneyToTime,
    replaceMoneyWithTime:replaceMoneyWithTime
  };


})();

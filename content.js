// Time is money

var oneSecondWage = function() {
  return (settings.yearlyWage * (1 - settings.tax)) / (settings.workingDays * 52) / settings.workingHours / 60 / 60;
};




var settings;

function run() {

  settings = TIM.settings.values;

  offsets = {
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


  var elements = document.querySelectorAll('*');

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var color = window.getComputedStyle(element).color;
        updatedText = TIM.convert.replaceMoneyWithTime(text);
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
}

TIM.view.addStyles();
TIM.settings.load(run);

// Time is money

function run() {

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
          var span = TIM.view.createReplacementNode(text, updatedText, color);
          element.replaceChild(span, node);
        }

      }
    }
  }
}

TIM.view.addStyles();
TIM.settings.load(run);

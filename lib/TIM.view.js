TIM.view = (function() {

  var createReplacementNode = function(text, updatedText, color) {
    // create the elements
    var span = document.createElement("span");
    var tooltip = document.createElement("span");
    // add the class names
    span.className = "timeIsMoney";
    tooltip.className = "timeIsMoney-tooltip";
    // set border
    span.style.borderColor = color;
    // set content
    var content = document.createTextNode(updatedText);
    var tooltipContent = document.createTextNode(text);
    var tooltipWithContent = tooltip.appendChild(tooltipContent);
    span.appendChild(content);
    span.appendChild(tooltip);
    return span;
  };

  return {
    createReplacementNode:createReplacementNode
  };

})();

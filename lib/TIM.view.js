TIM.view = (function() {

  var createReplacementNode = function(text, updatedText, color) {
    // create the elements
    var span = document.createElement("span");
    var tooltip = document.createElement("span");
    // add the class names
    span.className = "timeIsMoney";
    tooltip.className = "timeIsMoney-tooltip";
    // set content
    var content = document.createTextNode(text);
    var tooltipContent = document.createTextNode(updatedText);
    var tooltipWithContent = tooltip.appendChild(tooltipContent);
    span.appendChild(content);
    span.appendChild(tooltip);
    return span;
  };

  return {
    createReplacementNode:createReplacementNode
  };

})();

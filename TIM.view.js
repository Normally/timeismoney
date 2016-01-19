TIM.view = (function() {

  var addStyles = function() {

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

  return {
    addStyles:addStyles
  };

})();

// TIM.view = (function(){
//
//   var update = function(){
//     console.log("TODO");
//   };
//
//   return {
//     update:update
//   };
//
// })();

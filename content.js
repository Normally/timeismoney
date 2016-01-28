// Time is money

function getOffset (el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft,
    width: box.width,
    height: box.height
  }
}

function createTooltipNode(portion, match) {
  var span = document.createElement("span");
  span.classList.add("timeIsMoney");
  if (TIM.settings.values.replace == false) {
    span.setAttribute("data-time", TIM.convert.replaceMoneyWithTime(portion.text));
    span.innerHTML = portion.text;
  }
  else {
    span.setAttribute("data-time", portion.text);
    span.innerHTML = TIM.convert.replaceMoneyWithTime(portion.text);
  }
  span.addEventListener("mouseover", activateTooltip);
  span.addEventListener("mouseout", hideTooltip);
  return span;
};

function activateTooltip(e) {
  tooltip.innerHTML = e.target.getAttribute('data-time');
  offset = getOffset(e.target);
  tooltip.style.top = (offset.top-40+(offset.height/2))+"px";
  tooltip.style.left = (offset.left+offset.width+10)+"px";
  tooltip.classList.add('active');
}

function hideTooltip() {
  tooltip.classList.remove('active');
}

function addTooltipToPage() {
  tooltip = document.createElement("div");
  tooltip.classList.add("timeIsMoney-tooltip");
  document.body.appendChild(tooltip);
}

var tooltip;

function run() {

  addTooltipToPage();

  findAndReplaceDOMText(document.body, {
      find: TIM.settings.moneyRegex,
      replace: createTooltipNode
  });

}

TIM.settings.load(run);

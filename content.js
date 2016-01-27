// Time is money

function getOffset (el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft,
    width: box.width
  }
}

function createTooltipNode(portion, match) {
  var span = document.createElement("span");
  span.classList.add("timeIsMoney");
  span.setAttribute("data-time", TIM.convert.replaceMoneyWithTime(portion.text));
  span.innerHTML = portion.text;
  span.addEventListener("mouseover", activateTooltip);
  span.addEventListener("mouseout", hideTooltip);
  return span;
};

function activateTooltip(e) {
  tooltip.innerHTML = e.target.getAttribute('data-time');
  offset = getOffset(e.target);
  tooltip.style.top = offset.top+"px";
  tooltip.style.left = (offset.left+offset.width)+"px";
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

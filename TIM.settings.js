var TIM = {};

TIM.settings = (function () {

  this.values = {
    yearlyWage: 100000,
    tax: 0,
    workingDays: 5,
    workingHours: 8,
    isActive: true
  };

  var load = function(callback) {
    if (typeof chrome == "undefined" || typeof chrome.storage == "undefined") {
      callback();
    }
    else {
      chrome.storage.sync.get(values, function(items) {
        console.log(items);
        TIM.settings.values = items;
        if (items.isActive) {
          callback(); // run the code after we've got the values
        }
      });
    }
  };


  var set = function(key, value){
    TIM.settings.values[key] = value;
    chrome.storage.sync.set(TIM.settings.values, TIM.view.update);
  };

  return {
    load:load,
    set:set,
    values:this.values
  };

})();

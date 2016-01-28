// Saves options to chrome.storage.sync.
function save_options() {
  var re_strip = /[^0-9]/g;
  var monthlyWage = document.getElementById('monthlyWage').value;
  var workingHoursInput = document.getElementById('hours').value;
  var workingDaysInput = document.getElementById('days').value;
  var replaceCheckbox = document.getElementById('replace').checked;
  var cleaned = parseInt(monthlyWage.replace(re_strip, ''));
  chrome.storage.sync.set({
    monthlyWage: cleaned,
    workingHours: workingHoursInput,
    workingDays: workingDaysInput,
    replace: replaceCheckbox
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.className = 'show';
    status.textContent = 'Saved';
    status.style.opacity = 1;
    setTimeout(function() {
      status.style.opacity = 0;
      window.close();
    }, 750);
  });
}

function toggleActiveState() {
  chrome.storage.sync.get({ isActive: true }, function(items) {
    if (items.isActive) {
      chrome.storage.sync.set({ isActive: false });
    }
    else {
      chrome.storage.sync.set({ isActive: true });
    };
    document.getElementById("onOffSwitch").classList.toggle("onOffSwitch--off");
  });
};

function restore_options() {
  chrome.storage.sync.get({
    monthlyWage: '600',
    isActive: true,
    workingHours: 8,
    workingDays: 5,
    tax: 0,
    replace: false
  }, function(items) {
    document.getElementById('monthlyWage').value = items.monthlyWage;
    document.getElementById('hours').value = items.workingHours;
    document.getElementById('days').value = items.workingDays;
    document.getElementById('replace').checked = items.replace;
    if (!items.isActive) {
      document.getElementById("onOffSwitch").classList.add("onOffSwitch--off");
    };
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('onOffSwitch').addEventListener('click', toggleActiveState);
document.getElementById('monthlyWage').addEventListener('input', function(e) { save_options(); });
document.getElementById('hours').addEventListener('input', function(e) { save_options(); });
document.getElementById('days').addEventListener('input', function(e) { save_options(); });
document.getElementById('replace').addEventListener('click', function(e) { save_options(); });

// Advanced options toggle
document.getElementById('advancedOptionsToggle').addEventListener('click', function() {
  document.getElementById('advancedOptionsToggle').classList.toggle('advancedOptionsToggle--hidden');
  document.getElementById('window').classList.toggle('expanded');
});

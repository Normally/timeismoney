// Saves options to chrome.storage.sync.
function save_options() {
  var re_strip = /[^0-9]/g;
  var yearlyWage = document.getElementById('salary').value;
  var cleaned = parseInt(yearlyWage.replace(re_strip, ''));
  chrome.storage.sync.set({
    yearlyWage: cleaned
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
    yearlyWage: '22000',
    isActive: true
  }, function(items) {
    document.getElementById('salary').value = items.yearlyWage;
    if (!items.isActive) {
      document.getElementById("onOffSwitch").classList.add("onOffSwitch--off");
    };
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('onOffSwitch').addEventListener('click', toggleActiveState);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('salary').addEventListener('keypress', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13) { save_options(); }
});

// Advanced options toggle
document.getElementById('advancedOptionsToggle').addEventListener('click', function() {
  document.getElementById('advancedOptionsToggle').classList.toggle('advancedOptionsToggle--hidden');
  document.getElementById('window').classList.toggle('expanded');
});

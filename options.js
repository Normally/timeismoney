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

function setActiveStateTrue()  { setActiveState(true);  };
function setActiveStateFalse() { setActiveState(false); };

function setActiveState(state) {
  chrome.storage.sync.set({
    isActive: state
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.className = 'show';
    if (state) {
      status.textContent = "Switched on";
      document.getElementById('on').innerHTML  = "&#10004; On";
      document.getElementById('off').innerHTML = "Off";
    } else {
      status.textContent = "Switched off";
      document.getElementById('on').innerHTML  = "On";
      document.getElementById('off').innerHTML = "&#10004; Off";
    }
    status.style.opacity = 1;
    setTimeout(function() {
      status.style.opacity = 0;
      window.close();
    }, 750);
  });
};

function restore_options() {
  chrome.storage.sync.get({
    yearlyWage: '22000',
    isActive: true
  }, function(items) {
    document.getElementById('salary').value = items.yearlyWage;
    if (items.isActive) {
      document.getElementById('on').innerHTML  = "&#10004; On";
      document.getElementById('off').innerHTML = "Off";
    } else {
      document.getElementById('on').innerHTML  = "On";
      document.getElementById('off').innerHTML = "&#10004; Off";
    };
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('on').addEventListener('click', setActiveStateTrue);
document.getElementById('off').addEventListener('click', setActiveStateFalse);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('salary').addEventListener('keypress', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13) { save_options(); }
});

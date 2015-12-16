// Saves options to chrome.storage.sync.
function save_options() {
  var yearlySalary = document.getElementById('salary').value;
  chrome.storage.sync.set({
    yearlySalary: yearlySalary
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    yearlySalary: '22000'
  }, function(items) {
    document.getElementById('salary').value = items.yearlySalary;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('salary').addEventListener('submit', save_options);

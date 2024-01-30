document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('enabled', function(data) {
        document.getElementById('toggleButton').checked = data.enabled;
    });
});

document.getElementById('toggleButton').addEventListener('change', function() {
    var enabled = this.checked;
    chrome.storage.sync.set({enabled: enabled});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.executeScript(tabId, {file: "content.js"});
    }
});
var redirectListener = function(details) {
    var url = new URL(details.url);
    var search_params = url.searchParams;
    search_params.set('cr', 'countryUA');
	search_params.set('lr','lang_uk');
    url.search = search_params.toString();
    return {redirectUrl: url.toString()};
};

chrome.storage.sync.get('enabled', function(data) {
    if (data.enabled) {
        chrome.webRequest.onBeforeRequest.addListener(
            redirectListener,
            {urls: ["*://www.google.com/*"], types: ["main_frame"]},
            ["blocking"]
        );
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.enabled) {
        if (changes.enabled.newValue) {
            chrome.webRequest.onBeforeRequest.addListener(
                redirectListener,
                {urls: ["*://*.google.com/*"], types: ["main_frame"]},
                ["blocking"]
            );
        } else {
            chrome.webRequest.onBeforeRequest.removeListener(redirectListener);
        }
    }
});

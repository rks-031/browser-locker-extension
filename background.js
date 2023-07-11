let lockTimeout = null;
let lockTime = 0;

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ time: 0 });
});

chrome.tabs.onActivated.addListener(function () {
  clearTimeout(lockTimeout);
  if (lockTime > 0) {
    lockTimeout = setTimeout(lockBrowser, lockTime * 60000);
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  clearTimeout(lockTimeout);
  if (lockTime > 0 && changeInfo.status === "complete") {
    lockTimeout = setTimeout(lockBrowser, lockTime * 60000);
  }
});

function lockBrowser() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.update(activeTab.id, {
          url: "password_authentication.html",
        });
      }
    }
  });
}

chrome.storage.sync.get("time", function (result) {
  lockTime = result.time;
  if (lockTime > 0) {
    lockTimeout = setTimeout(lockBrowser, lockTime * 60000);
  }
});

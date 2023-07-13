//SaveGuarding the Original Background-js 

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
    if (tabs && tabs.length > 0) {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.get(activeTab.id, function (tab) {
          if (tab) {
            chrome.tabs.update(tab.id, { url: "password_authentication.html" });
          } else {
            console.log("Failed to get the active tab.");
          }
        });
      } else {
        console.error("No tab ID found for the active tab.");
      }
    } else {
      console.error("No active tab found.");
    }
  });
}

chrome.storage.sync.get("time", function (result) {
  lockTime = result.time;
  console.log(lockTimeout);
  console.log(lockTime)
  if (lockTime > 0) {
    lockTimeout = setTimeout(lockBrowser, lockTime * 60000);
  }
});

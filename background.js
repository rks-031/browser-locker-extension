chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ time: 0 });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.storage.sync.get(["time", "password"], function (result) {
    const time = result.time;
    const password = result.password;
    if (time > 0 && changeInfo.status === "complete") {
      setTimeout(function () {
        chrome.tabs.update(tabId, { url: "password_authentication.html" });
      }, time * 60000);
    }
  });
});

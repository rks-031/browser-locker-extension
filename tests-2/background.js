const lockTime = 3000;

// Variable to keep track of whether the browser is locked
let isLocked = false;

// Function to lock the browser
function lockBrowser() {
  isLocked = true;
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if (tab.url.startsWith("https") && !tab.url.startsWith("password_authentication.html")) {
        chrome.tabs.update(tab.id, { url: "password_authentication.html" });
      }
    });
  });
}

// Function to unlock the browser
function unlockBrowser() {
  isLocked = false;
}

// Set a timeout to lock the browser after the specified time
setTimeout(lockBrowser, lockTime);

// Check if the browser is locked and redirect to the password authentication page if necessary
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (isLocked && tab.url.startsWith("https") && !tab.url.startsWith("password_authentication.html")) {
    chrome.tabs.update(tabId, { url: "password_authentication.html" });
  }
});

// Listen for messages from the password authentication page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.unlock && request.password === "YOUR_PASSWORD") {
    unlockBrowser();
    sendResponse({ success: true });
  } else {
    sendResponse({ success: false });
  }
});

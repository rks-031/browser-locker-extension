const second = 1000;

console.log("LockBrowser activated!");

// Retrieve the stored time from storage
chrome.storage.sync.get("time", function (result) {
  const time = result.time;
  if (time) {
    // Convert time to milliseconds
    const lockTime = time * 60 * 1000;

    // Set the idle threshold
    chrome.idle.setDetectionInterval(lockTime);

    // Start monitoring for user idle state
    chrome.idle.onStateChanged.addListener(function (newState) {
      if (newState === "idle") {
        lockBrowser();
      }
    });
  } else {
    console.log("Time is undefined. Please set a valid time.");
  }
});

function lockBrowser() {
  chrome.windows.create({ url: "password_authentication.html" });
}

// Listen for runtime.onInstalled event
chrome.runtime.onInstalled.addListener(function () {
  // Clear any existing idle state
  chrome.idle.queryState(0, function (state) {});

  // Clear the browser lock on extension installation
  chrome.windows.getAll(function (windows) {
    windows.forEach(function (window) {
      chrome.windows.remove(window.id);
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs[0]) {
    const activeTab = tabs[0];
    if (activeTab.id) {
      chrome.tabs.get(activeTab.id, function (tab) {
        if (tab) {
          chrome.storage.sync.get(["password", "time"], (res) => {
            const password = res.password;
            const time = res.time;

            console.log(`Password: ${password}`);
            console.log(`Time is: ${time}`);

            if (time === undefined) {
              console.log("Time is undefined. Please set a valid time.");
            } else {
              setTimeout(() => {
                chrome.windows.create(
                  { url: "password_authentication.html" },
                  function (window) {
                    const windowId = window.id;

                    // Blocking web navigation to existing tabs
                    chrome.webNavigation.onBeforeNavigate.addListener(
                      (details) => {
                        if (details.tabId !== activeTab.id) {
                          chrome.tabs.update(details.tabId, {
                            url: "password_authentication.html",
                          });
                          chrome.tabs.remove(details.tabId);
                        }
                      },
                      { url: [{ urlMatches: "<all_urls>" }] }
                    );

                    // Blocking creation of new tabs
                    chrome.tabs.onCreated.addListener((newTab) => {
                      chrome.tabs.remove(newTab.id);
                    });

                    // Unlocking the browser when the correct password is entered
                    chrome.runtime.onMessage.addListener(
                      (request, sender, sendResponse) => {
                        if (
                          request.password === password &&
                          sender.tab.windowId === windowId
                        ) {
                          chrome.windows.remove(windowId);
                        }
                      }
                    );
                  }
                );
              }, time * second * 60 );
            }
          });
        } else {
          console.error("Failed to get the active tab.");
        }
      });
    } else {
      console.error("No tab ID found for the active tab.");
    }
  } else {
    console.error("No active tab found.");
  }
});

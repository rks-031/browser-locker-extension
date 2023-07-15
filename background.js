const second = 1000;

console.log("LockBrowser activated!");

// Querying for the active tab
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs[0]) {
    const activeTab = tabs[0];
    if (activeTab.id) {
      chrome.tabs.get(activeTab.id, function (tab) {
        if (tab) {
          // Retrieving the stored password and time from storage
          chrome.storage.sync.get(["password", "time"], (res) => {
            const password = res.password;
            const time = res.time;

            console.log(`Password: ${password}`);
            console.log(`Time is: ${time}`);

            if (time === undefined) {
              console.log("Time is undefined. Please set a valid time.");
            } else {
              // Setting a timeout to lock the browser after the specified time
              setTimeout(() => {
                // Creating a new window for password authentication
                chrome.windows.create(
                  { url: "password_authentication.html" },
                  function (window) {
                    const windowId = window.id;

                    // Blocking web navigation and new tab creation
                    chrome.webNavigation.onBeforeNavigate.addListener(
                      (details) => {
                        if (details.tabId === activeTab.id) {
                          chrome.tabs.update(activeTab.id, {
                            url: "password_authentication.html",
                          });
                        }
                        chrome.tabs.remove(details.tabId);
                      }
                    );

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
              }, time * second);
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

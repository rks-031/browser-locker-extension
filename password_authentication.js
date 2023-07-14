document.addEventListener("DOMContentLoaded", function () {
  const unlockBtn = document.getElementById("setTimeBtn");
  const passwordInput = document.getElementById("passwordInput");
  const statusMessage = document.getElementById("statusMessage");

  let locked = true; // Flag to track if the browser is locked

  unlockBtn.addEventListener("click", function () {
    const password = passwordInput.value;
    chrome.storage.sync.get("password", function (result) {
      const storedPassword = result.password;
      if (password === storedPassword) {
        unlockPage();
      } else {
        displayErrorMessage("Oops! Incorrect password. Please try again!!");
      }
    });
  });

  function unlockPage() {
    // Disable input and button to prevent further interactions
    passwordInput.disabled = true;
    unlockBtn.disabled = true;

    // Show the unlock success message
    statusMessage.textContent = "Browser unlocked!";
    statusMessage.style.color = "black";
    statusMessage.style.display = "block";

    setTimeout(() => {
      locked = false; // Update the locked flag
      window.close(); // Close the password_authentication.html page
    }, 2000); // Delay in milliseconds before closing the page
  }

  // Add event listener to prevent navigation to other tabs
  chrome.webNavigation.onBeforeNavigate.addListener(preventNavigation, {
    url: [{ urlMatches: "<all_urls>" }],
  });

  function preventNavigation(details) {
    // Check if the browser is locked
    if (locked) {
      // Cancel the navigation request
      chrome.webNavigation.onBeforeNavigate.removeListener(preventNavigation);
      chrome.webNavigation.onCommitted.removeListener(preventNavigation);
      chrome.webNavigation.onErrorOccurred.removeListener(preventNavigation);

      chrome.tabs.remove(details.tabId);
    }
  }

  function displayErrorMessage(message) {
    statusMessage.textContent = message;
    statusMessage.style.color = "black";
    statusMessage.style.display = "block"; // Make the status message visible
  }
});

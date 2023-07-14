document.addEventListener("DOMContentLoaded", function () {
  const unlockBtn = document.getElementById("setTimeBtn");
  const passwordInput = document.getElementById("passwordInput");
  const statusMessage = document.getElementById("statusMessage");

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
    // Hide the password authentication form and show the unlock success message
    document.querySelector(".container").style.display = "none";
    statusMessage.textContent = "Browser unlocked!";
  }

  function displayErrorMessage(message) {
    statusMessage.textContent = message;
    statusMessage.style.color = "black";
    statusMessage.style.display = "block"; // Make the status message visible
  }
});

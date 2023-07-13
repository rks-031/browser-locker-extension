document.addEventListener("DOMContentLoaded", function () {
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const statusMessage = document.getElementById("statusMessage");

  unlockBtn.addEventListener("click", function () {
    const password = passwordInput.value;
    chrome.storage.sync.get("password", function (result) {
      const storedPassword = result.password;
      if (password === storedPassword) {
        unlockPage();
      } else {
        displayErrorMessage("Incorrect password. Please try again.");
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
    statusMessage.style.color = "red";
  }
});

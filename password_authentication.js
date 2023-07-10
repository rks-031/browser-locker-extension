document.addEventListener("DOMContentLoaded", function () {
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const statusMessage = document.getElementById("statusMessage");

  unlockBtn.addEventListener("click", function () {
    const password = passwordInput.value;
    // Replace the following code with your own password verification logic

    // Sample password for demonstration purposes
    const correctPassword = "password123";

    if (password === correctPassword) {
      unlockPage();
    } else {
      displayErrorMessage("Incorrect password. Please try again.");
    }
  });

  function unlockPage() {
    // Perform actions to unlock the page here
    // For example, you can enable certain features, remove restrictions, or show hidden content
    statusMessage.textContent = "Page unlocked!";
  }

  function displayErrorMessage(message) {
    statusMessage.textContent = message;
    // Optionally, you can add additional styling or effects to the error message
    statusMessage.style.color = "red";
  }
});

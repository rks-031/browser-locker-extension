document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const password = document.getElementById('passwordInput').value;
    chrome.runtime.sendMessage({ type: 'password', password: password });
  });
  
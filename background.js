chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(tab.id, {
    code: `
            var overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
      
            var message = document.createElement('h1');
            message.style.color = '#fff';
            message.style.fontFamily = 'Arial, sans-serif';
            message.style.fontSize = '36px';
            message.style.textAlign = 'center';
            message.textContent = 'Browser Locked';
      
            overlay.appendChild(message);
            document.body.appendChild(overlay);
          `,
  });
});

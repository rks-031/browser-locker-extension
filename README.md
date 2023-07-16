**_#Look of the extension in chrome://extensions/ page:_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/a4f382b8-aaf9-42bd-8f0d-8e3373d35405)

**_#On clicking the extension icon(lock):_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/f4fe2616-e640-4d29-9639-1da9d7c98310)

**_#Type your password:_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/16147d93-2081-4199-b7f1-3eada70f01e7)

**_#Select time:_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/2ddb209e-f213-4e8f-8d1e-ddb6280a5eb3)

**_#Time set successfully prompt:_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/50fa048b-11a7-44b1-a667-5fdbfd2ec9ae)

**_#Password authenticator window:_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/9d5e803d-6449-4af7-9571-8b80caf398c7)

**_#On inputing wrong password:_**

![image](https://github.com/rks-031/browser-locker-extension/assets/103258259/b5e3ea4c-3fe6-402d-88bd-89a3c83e6f2f)

**_#On inputting correct password:_**

https://github.com/rks-031/browser-locker-extension/assets/103258259/1ef22c8e-4132-4898-939d-a4b319a0373e

***#How to use this extension?***

1. Fork this repository.
2. Clone it using `Github desktop` application or by the command: **git clone https://github.com/YOUR-USERNAME/yt-bookmark-googleExtension**.
3. Go to **chrome://extensions/** by opening a new tab on Chrome.
4. Toggle on the **Developer mode**.
5. Click on **Load Unpacked** button.
6. Select this repository folder and the extension will be added.

***#Here are the step-by-step points for the extension's functionality:***

1. _When you click on the extension's icon, a popup window (popup.html) will appear._

2. _In the popup window, you will see a heading "Lock Your Browser" and a message "Enter your password to unlock later."_

3. _Below the message, there will be an input field of type password where you can enter your password._

4. _Next to the password input field, there will be a button "Set Time."_

5. _Clicking on the "Set Time" button will trigger a prompt dialog asking you to enter the time in minutes (1, 5, 10, ..., 90)._

6. _Enter the desired time interval in minutes and click "OK" in the prompt dialog._

7. _If you entered a valid time interval, the extension will store the time value in Chrome's storage system using `chrome.storage.sync.set()`. The status message below the button will display "Time set successfully!"_

8. _After setting the time, the extension will monitor your browser activity._

9. _If you remain inactive in the browser (no new tab navigation or page refresh) for the specified time interval, the extension will lock the browser._

10. _When the browser is locked, the active tab will be redirected to the password authentication page (password_authentication.html)._

11. _On the password authentication page, you will see a heading "Password Authentication" and a message "Please enter your password to unlock."_

12. _There will be an input field of type password where you can enter the password to unlock the browser._

13. _Below the password input field, there will be a button "Unlock Browser."_

14. _Enter your password in the input field and click on the "Unlock Browser" button._

15. _The extension will compare the entered password with the stored password in Chrome's storage using `chrome.storage.sync.get()`._

16. _If the entered password matches the stored password, the password authentication form will be hidden, and the status message will display "Browser unlocked!"_

17. _If the entered password does not match the stored password, the status message will display "Incorrect password. Please try again."_

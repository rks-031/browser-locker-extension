# Here are the step-by-step points for the extension's functionality:

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

/*

Background-js file which checks for Timeouts and doesn't currently applies the background lock.

*/

const second = 1000;
//Defining the timeout in Seconds and Not minutes - Just for Development
//Eg:if Prompt val is 5  : Timeout is for 5000ms / 5s

//Log statement to just chcck if background-js file is correctly attached with the extension
console.log("LockBrowser activated!");

//using Chrome's Tab API to check for current Tabs | This returns a current list/array of objects containing all the active tabs
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  console.log(tabs); //Check for tabs array in Console

  //A check if the query is a valid one.
  if (tabs[0]) {
    const activeTab = tabs[0];
    console.log(`The Current Active Tab --> ${activeTab}`);

    //Keeping a check if active tab is a valid tab and NOT undefined
    if (activeTab.id) {
      chrome.tabs.get(activeTab.id, function (tab) {
        //getting the current tab,where its url will be switched to ./password_authentication.html
        if (tab) {
          //Just for Dev Purpose:To see what password is being stored in the User's ID.
          chrome.storage.sync.get("password", (res) => {
            console.log(`Password  : ${res.password}`);
          });

          //Extracting The time hooked in User's ID to set a Timeout : after which Tab's URL is set to ./password_authentication.html
          chrome.storage.sync.get("time", (res) => {
            console.log(`Time is : ${res.time}`); //Just for Testing
            if (res.time === undefined) {
              console.log(
                "Time is Undefined.To fix,correctly type your password and then plug the time in the prompt."
              );
            } else {
              setTimeout(() => {
                //creating a new Window with password_authenticator URL after required time
                chrome.windows.create({ url: "password_authentication.html" });
              }, res.time * second);
            }
          });

          //Error Logs , If any (as per the original Src Code..)
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

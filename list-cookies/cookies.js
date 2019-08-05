function showCookiesForTab(tabs) {
  // get the first tab object in the array
  const tab = tabs[0];

  // get all cookies in the domain
  const cookies = browser.cookies.getAll({ url: tab.url });

  cookies.then(cookies => {
    // set the header of the panel
    var text = document.createTextNode(
      `${cookies.length} cookies at ${tab.title}:`
    );
    setHeader(text);

    var cookieList = document.getElementById("cookie-list");

    if (cookies.length > 0) {
      //add an <li> item with the name and value of the cookie to the list
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(
          cookie.name + ": " + cookie.value
        );
        li.appendChild(content);
        cookieList.appendChild(li);
      }
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies in this tab.");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
}

// get active tab to run an callback function.
// it sends to our callback an array of tab objects
function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}
getActiveTab().then(showCookiesForTab);

// DOM utils (side effects)

function setHeader(text) {
  const header = document.getElementById("header-title");
  if (header) {
    header.appendChild(text);
  }
}

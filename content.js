// content.js

// Create a dictionary to store the key and URL pairs.
let shortcutKeys = {};

// Function to open a URL based on a key and its corresponding URL.
function fireShortcut(key) {
  // Get the URL based on the key.
  let url = shortcutKeys[key];

  // If the URL exists, open it in the current tab.
  if (url) {
    window.location.href = url;
  }
}

// Function to add a key and URL pair to the dictionary.
function addShortcutKey(key, url) {
  // If the key and URL exist, add the key and URL pair to the dictionary.
  if (key && url) {
    shortcutKeys[key] = url;
  }
}

// Function to add an icon to a container element.
function addIcon(container, key, rightMargin) {
  // Create an icon element.
  let icon = document.createElement("img");

  // Convert the key to a lowercase string.
  let character = key.toString().toLowerCase();

  // Set the path to the icon, based on the character.
  let pathToIcon = "icons/icon_" + character + ".png";

  // Set the icon's attributes.
  icon.src = chrome.extension.getURL(pathToIcon);
  icon.alt = "Icon";

  // Style the icon to match the text size, and add margin and vertical alignment.
  icon.style.width = "1.2em";
  icon.style.height = "1.2em";
  icon.style.marginRight = rightMargin;
  icon.style.verticalAlign = "middle";

  // Prepend the icon to the heading element.
  container.prepend(icon);
}

// Select all search result links, based on the class name.
let searchResultContainers = document.querySelectorAll(".MjjYud");

// Convert the NodeList to an Array.
searchResultContainers = Array.from(searchResultContainers);

// Filter out search result containers that do not contain a link.
searchResultContainers = searchResultContainers.filter((container) => {
  return container.querySelector("h3");
});

// Filter Google Image results by removing instances of the .EyBRub class.
searchResultContainers = searchResultContainers.filter((container) => {
  return !container.querySelector(".EyBRub");
});

// Limit the number of search result containers to 10.
searchResultContainers = searchResultContainers.slice(0, 10);

// Loop through each search result container.
searchResultContainers.forEach((container, index) => {
  // Convert 0-based index to 1-based key.
  let key = index + 1;

  // The 10th key is 0.
  if (index == 9) {
    key = 0;
  }

  // Get the heading element.
  let heading = container.querySelector("h3");

  // Get the a tag within the container.
  let aTag = container.querySelector("a");

  // Retrieve the URL from the a tag by getting the href attribute.
  let url = aTag.getAttribute("href");

  // If the URL exists, add the icon and store the key and URL pair.
  if (url) {
    addIcon(heading, key, "10px");
    addShortcutKey(key, url);
  }
});

// Function to handle keypress events.
function handleKeypress(event) {
  // Get the name of the active element.
  let activeElement = document.activeElement.tagName.toLowerCase();

  // Ignore any keypress if the user is typing in an input or textarea.
  if (activeElement === "input" || activeElement === "textarea") {
    return;
  }

  // Get the key that was pressed.
  let key = event.key.toUpperCase();

  // Fire the shortcut based on the key.
  fireShortcut(key);
}

// Select all the a tags on the page.
let searchTabATags = document.querySelectorAll("a");

// Convert the NodeList to an Array.
searchTabATags = Array.from(searchTabATags);

// Filter out search tab containers that do not contain the YmvwI class.
searchTabATags = searchTabATags.filter((container) => {
  return container.querySelector(".YmvwI");
});

searchTabATags.forEach((aTag) => {
  // Get the div element inside the a tag.
  let div = aTag.querySelector("div");

  // Get the inner text of the tab.
  let innerText = div.innerText.trim().toLowerCase();

  // Get the URL from the tab by getting the href attribute.
  let url = aTag.getAttribute("href");

  // If the URL does not exist, return.
  if (!url) {
    return;
  }

  // Add the Letter "A" icon to the All tab.
  if (innerText === "all") {
    addIcon(div, "A", "0px");
    addShortcutKey("A", url);
  }

  // Add the Letter "I" icon to the Images tab.
  if (innerText === "images") {
    addIcon(div, "I", "0px");
    addShortcutKey("I", url);
  }

  // Add the Letter "V" icon to the Videos tab.
  if (innerText === "videos") {
    addIcon(div, "V", "0px");
    addShortcutKey("V", url);
  }

  // Add the Letter "N" icon to the News tab.
  if (innerText === "news") {
    addIcon(div, "N", "0px");
    addShortcutKey("N", url);
  }

  // Add the Letter "P" icon to the Products tab.
  if (innerText === "products") {
    addIcon(div, "P", "0px");
    addShortcutKey("P", url);
  }

  // Add the Letter "M" icon to the Maps tab.
  if (innerText === "maps") {
    addIcon(div, "M", "0px");
    addShortcutKey("M", url);
  }

  // Add the Letter "M" icon to the Maps tab.
  if (innerText === "books") {
    addIcon(div, "B", "0px");
    addShortcutKey("B", url);
  }
});

// Listen for keypress events.
document.addEventListener("keypress", handleKeypress);

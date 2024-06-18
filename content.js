// content.js

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

  // Create an icon element.
  let icon = document.createElement("img");

  // Set the path to the icon, based on the key.
  let pathToIcon = "icons/icon_" + key + ".png";

  // Set the icon's attributes.
  icon.src = chrome.extension.getURL(pathToIcon);
  icon.alt = "Icon";

  // Style the icon to match the text size, and add margin and vertical alignment.
  icon.style.width = "1.2em";
  icon.style.height = "1.2em";
  icon.style.marginRight = "10px";
  icon.style.verticalAlign = "middle";

  // Get the heading element.
  let heading = container.querySelector("h3");

  // Prepend the icon to the heading element.
  heading.prepend(icon);
});

function handleKeypress(event) {
  let activeElement = document.activeElement.tagName.toLowerCase();

  // Ignore any keypress if the user is typing in an input or textarea.
  if (activeElement === "input" || activeElement === "textarea") {
    return;
  }

  // Get the key pressed as an integer.
  let key = parseInt(event.key);

  // Ignore any keypress that is not a number.
  if (isNaN(key)) {
    return;
  }

  // Convert 1-based key to 0-based index.
  let index = key - 1;

  // The 10th key is 0.
  if (key == 0) {
    index = 9;
  }

  let container = searchResultContainers[index];

  if (container) {
    // Get the link element.
    let link = container.querySelector("a");

    // Open the link in the current tab.
    link.click();
  }
}

// Listen for keypress events.
document.addEventListener("keypress", handleKeypress);

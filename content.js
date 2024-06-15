// contentScript.js

console.log("content.js loaded");

// Select all search result links, based on the class name.
let searchResultContainers = document.querySelectorAll(".MjjYud");

// Convert the NodeList to an Array.
searchResultContainers = Array.from(searchResultContainers);

// Filter out search result containers that do not contain a link.
searchResultContainers = searchResultContainers.filter((container) => {
  return container.querySelector("h3");
});

//TODO Remove this line
console.log("searchResultContainers: ", searchResultContainers);

// Loop through each search result container.
searchResultContainers.forEach((container) => {
  // Create an icon element.
  let icon = document.createElement("img");

  // Set the icon's attributes.
  icon.src =
    "https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_15_2x.png"; //TODO Change the icon
  icon.alt = "Icon";

  // Style the icon to match the text size
  icon.style.width = "1.5em"; // Match the font size of the text
  icon.style.height = "1.5em"; // Match the font size of the text
  icon.style.marginRight = "10px"; // Add some space between the icon and the text
  icon.style.verticalAlign = "middle"; // Vertically align the icon with the text

  // Get the heading element.
  Heading = container.querySelector("h3");
  Heading.prepend(icon);
});

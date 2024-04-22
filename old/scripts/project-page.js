function updateReadingTime(elementId, outputElementId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) {
        console.log("Element not found");
        return;
    }

    const text = textElement.innerText || textElement.textContent; // Get text content
    const words = text.match(/\w+/g).length; // Count words
    const wordsPerMinute = 225; // Average between 200 and 250
    const readingTime = words / wordsPerMinute; // Calculate reading time in minutes
    const roundedTime = Math.ceil(readingTime); // Round up to the nearest whole number

    // Format the reading time range
    const readingTimeFormatted = `${roundedTime}-${roundedTime + 1} Minutes read`;

    // Update the text content of the output element
    const outputElement = document.getElementById(outputElementId);
    if (outputElement) {
        outputElement.textContent = readingTimeFormatted;
    } else {
        console.log("Output element not found");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateReadingTime('content-main', 'read-time');
});

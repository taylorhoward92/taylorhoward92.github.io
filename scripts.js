// Text box to hold the Withings Grant Code.
const grantCodeTextBox = document.getElementById('grant-code');

// Notification elements.
const notification = document.getElementById('notification');

// Show text in a notification element and style it with a given class name.
function notify(text, className) {
    // Hide incase any notification is currently displayed.
    notification.style.display = 'none';

    // Reset the classes to just be the base notification class.
    notification.className = 'notification';

    // Se the value and add the class name to style the element.
    notification.innerText = text;
    notification.classList.add(className);

    // Display the notification for 5 seconds then hide again
    notification.style.display = 'block';
    setTimeout(() => { notification.style.display = 'none' }, 5000);
}

// Show a notification of success.
function successNotify(text) {
    notify(text, 'is-success');
}

// Show a notification for failure.
function failureNotify(text) {
    notify(text, 'is-danger');
}

// Function to copy the Withings Grant Code to the clipboard
function setClipboard() {
    var type = "text/plain";
    var blob = new Blob([grantCodeTextBox.value], { type });
    var data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard.write(data).then(() => successNotify('Copied!'), () => failureNotify('Error!'));
}

// Array of URL query parameters with each element being an array of [key, value].
const urlQueryParams = [];

// Process each key value query pair.
window.location.search.substring(1).split('&').forEach((keyValuePair) => {

    // If the value is an empty string then there are not any query parameters.
    if (keyValuePair !== '') {

        // Split out the key and the value.
        const keyValuePairSplit = keyValuePair.split('=');

        // If there is a key and optionally a value.
        if (keyValuePairSplit.length < 3) {

            // Add the key value array to the URL query parameter array.
            urlQueryParams.push(keyValuePairSplit);

        // If the length is some other number then an equals sign has been used in the query which is not supported.
        } else {
            failureNotify(`URL query with invalid format '${keyValuePair}'`);
        }
    }
})

// If there is at least one key value pair in the query parameters array
if (urlQueryParams.length > 0) {

    // Process each key value pair.
    urlQueryParams.forEach((keyValuePair) => {

        // If the key for the pair is 'code'
        if (keyValuePair[0] === 'code') {

            // Length should be two if there is both a key and a value
            if (keyValuePair.length === 2) {
                
                // Assign the value to the text box
                grantCodeTextBox.value = keyValuePair[1];

            // If the length isn't two then the format is wrong
            } else {
                failureNotify("incorrect format for query parameter 'code'");
            }
        }
    });
}



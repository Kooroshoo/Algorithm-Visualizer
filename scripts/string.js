document.addEventListener('DOMContentLoaded', function () {
    const stringContainer = document.getElementById('string-container');

    // Make currentString a global variable by attaching it to the window object
    window.currentString = "";

    // Generates a random string and updates the display
    window.generateString = function (length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        window.currentString = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        updateStringDisplay(window.currentString);
        window.logToConsole && window.logToConsole('Generated new string: ' + window.currentString);
    };

    // Updates the displayed string with optional highlights
    function updateStringDisplay(str, highlightIndices = [], message = "") {
        stringContainer.innerHTML = str.split('').map((char, index) => `
            <div class="char-box ${highlightIndices.includes(index) ? 'comparing' : ''}">
                ${char}
                <div class="index-label">${index}</div>
            </div>
        `).join('');

        if (message && window.logToConsole) {
            window.logToConsole(message);
        }
    }

    // Step-by-step visualization for string operations
    window.visualizeStringStep = async function (str, highlightIndices = [], message = "", isError = false) {
        updateStringDisplay(str, highlightIndices, message);
        await new Promise(resolve => setTimeout(resolve, window.speed));
        if (isError) throw new Error(message);
    };

    // Listen for manual input changes
    document.getElementById('string-input').addEventListener('input', function (e) {
        window.currentString = e.target.value; // Update global currentString
        updateStringDisplay(window.currentString);
    });

    // Generate a random string on page load
    window.generateString();
});

// string.js

document.addEventListener('DOMContentLoaded', function () {
    const stringContainer = document.getElementById('string-container');
    window.currentString = "";
  
    // Generate a random string and update the display.
    window.generateString = function (length = 10) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      window.currentString = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      stringContainer.innerHTML = window.currentString.split('').map((char, index) => `
        <div class="string-char-box">
          ${char}
          <div class="string-index-label">${index}</div>
        </div>
      `).join('');
      window.logToConsole && window.logToConsole('Generated new string: ' + window.currentString);
    };
  
    // Animate one step by updating the visualization and pausing.
    window.visualizeStringStep = async function (input, highlightIndices = [], message = "") {
      let str = (input && typeof input.join === 'function') ? input.join('') : String(input);
      highlightIndices = Array.isArray(highlightIndices) ? highlightIndices : [];
      stringContainer.innerHTML = str.split('').map((char, index) => `
        <div class="string-char-box ${highlightIndices.includes(index) ? 'string-comparing' : ''}">
          ${char}
          <div class="string-index-label">${index}</div>
        </div>
      `).join('');
      window.logToConsole(Array.isArray(message) ? message.join('') : String(message));
      await new Promise(resolve => setTimeout(resolve, window.stringSpeed  || 500));
    };
  
    document.getElementById('string-input').addEventListener('input', e => {
      window.currentString = e.target.value;
      window.visualizeStringStep(window.currentString);
    });
  });
  
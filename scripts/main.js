// Global settings and other UI-related logic

// Global speed setting
window.speed = 500;

// A simple on-page console logging function.
const consoleOutput = document.getElementById('console');
window.logToConsole = function (message) {
  consoleOutput.innerHTML += `<div>> ${message}</div>`;
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
};

// Attach event listeners that are not directly tied to the editor.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('run-code').addEventListener('click', window.runCode);
  document.getElementById('generate').addEventListener('click', function() {
    window.generateArray();  
  });
  document.getElementById('speed').addEventListener('input', e => {
    // Moving the slider to the right speeds up execution.
    window.speed = 1000 - parseInt(e.target.value) + 1;
  });

  // Generate an initial array when the page loads.
  window.generateArray();
});

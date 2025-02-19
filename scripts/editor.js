// Initialize the Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  window.editor = monaco.editor.create(document.getElementById('editor'), {
    value: algorithms.javascript.bubble, // default code snippet
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible'
    }
  });
});

// --- Pyodide-related logic ---
let pyodideInstance;
window.initializePyodide = async function () {
  if (!pyodideInstance) {
    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.0/full/'
    });
    await pyodideInstance.loadPackage('micropip');
  }
  return pyodideInstance;
};

// Execute the code from the editor (supports both JavaScript and Python)
window.runCode = async function () {
    const consoleOutput = document.getElementById('console');
    consoleOutput.innerHTML = ''; // Clear previous output
  
    const code = window.editor.getValue();
    const language = document.getElementById('language-selector').value;
  
    // Check if 'array' exists and is not null
    const hasArray = typeof array !== 'undefined' && array !== null;
  
    try {
      if (language === 'javascript') {
          const originalLog = console.log;
          console.log = msg => logToConsole(msg);
          // Dynamically determine parameters and arguments based on array existence
          const params = hasArray ? ['array', 'visualizeStep'] : [];
          const args = hasArray ? [array, visualizeStep] : [];
          await new Function(...params, code)(...args);
          console.log = originalLog;
      } else if (language === 'python') {
          const pyodide = await initializePyodide();
          // Only set globals if array exists
          if (hasArray) {
              pyodide.globals.set('array', array);
              pyodide.globals.set('visualize_step', (...args) => visualizeStep(Array.from(args[0]), Array.from(args[1] || []), Array.from(args[2] || [])));
          }
          pyodide.globals.set('log_to_console', logToConsole);
          
          await pyodide.runPythonAsync(`
  import sys
  import asyncio
  sys.stdout.write = log_to_console
          `);
          
          await pyodide.runPythonAsync(code);
      }
      logToConsole("Execution completed successfully");
    } catch (error) {
      logToConsole(`Error: ${error.message}`);
    }
  };

// --- Editor UI event listeners ---

document.addEventListener('DOMContentLoaded', function () {
  // When the algorithm selector changes, load the corresponding code snippet.
  document.getElementById('algorithm-selector').addEventListener('change', function () {
    const lang = document.getElementById('language-selector').value;
    const selectedAlgorithm = this.value;
    if (window.editor && algorithms[lang] && algorithms[lang][selectedAlgorithm]) {
      window.editor.setValue(algorithms[lang][selectedAlgorithm]);
    }
  });

  // When the language selector changes, update both the editor's content and its language mode.
  document.getElementById('language-selector').addEventListener('change', function () {
    const algorithm = document.getElementById('algorithm-selector').value;
    if (window.editor && algorithms[this.value] && algorithms[this.value][algorithm]) {
      window.editor.setValue(algorithms[this.value][algorithm]);
      monaco.editor.setModelLanguage(window.editor.getModel(), this.value);
    }
  });
});


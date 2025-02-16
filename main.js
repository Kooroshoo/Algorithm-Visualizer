let array = [];
const container = document.getElementById('arrayContainer');
const consoleOutput = document.getElementById('console');
const speedControl = document.getElementById('speed');
let editor;
let speed = 500;
let pyodideInstance;

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs' } });
require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: algorithms.javascript.bubble,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollbar: {
            vertical: "visible",
            horizontal: "visible"
        }
    });
});

async function initializePyodide() {
    if (!pyodideInstance) {
        pyodideInstance = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.0/full/"
        });
        await pyodideInstance.loadPackage("micropip");
    }
    return pyodideInstance;
}

function logToConsole(message) {
    consoleOutput.innerHTML += `<div>> ${message}</div>`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function generateArray(num = 20) {
    array = Array.from({length: num}, () => Math.floor(Math.random() * 280) + 20);
    container.innerHTML = array.map(value => `
        <div class="bar" style="height: ${value}px">
            <span>${value}</span>
        </div>
    `).join('');
    logToConsole('Generated new array');
}

function updateVisualization(arr, comparingIndices = [], sortedIndices = []) {
    const bars = container.getElementsByClassName('bar');
    arr.forEach((value, i) => {
        bars[i].style.height = `${value}px`;
        bars[i].querySelector('span').textContent = value;
        bars[i].className = 'bar' + 
            (comparingIndices.includes(i) ? ' comparing' : '') +
            (sortedIndices.includes(i) ? ' sorted' : '');
    });
}

async function visualizeStep(arr, comparingIndices = [], sortedIndices = []) {
    if (typeof comparingIndices?.includes !== 'function') {
        comparingIndices = Array.from(comparingIndices || []);
    }
    if (typeof sortedIndices?.includes !== 'function') {
        sortedIndices = Array.from(sortedIndices || []);
    }
    updateVisualization(arr, comparingIndices, sortedIndices);
    await new Promise(resolve => setTimeout(resolve, speed));
}

async function runCode() {
    consoleOutput.innerHTML = '';
    const code = editor.getValue();
    const language = document.getElementById('language-selector').value;
    
    try {
        if (language === 'javascript') {
            const originalLog = console.log;
            console.log = msg => logToConsole(msg);
            await new Function('array', 'visualizeStep', code)(array, visualizeStep);
            console.log = originalLog;
        } else if (language === 'python') {
            const pyodide = await initializePyodide();
            pyodide.globals.set('array', array);
            pyodide.globals.set('visualize_step', visualizeStep);
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
        logToConsole(`Error: \${error.message}`);
    }
}

document.getElementById('run-code').addEventListener('click', runCode);
document.getElementById('generate').addEventListener('click', () => generateArray());
document.getElementById('algorithm-selector').addEventListener('change', function() {
    const lang = document.getElementById('language-selector').value;
    const selectedAlgorithm = this.value;
    editor.setValue(algorithms[lang][selectedAlgorithm]);
});
document.getElementById('language-selector').addEventListener('change', function() {
    const algorithm = document.getElementById('algorithm-selector').value;
    editor.setValue(algorithms[this.value][algorithm]);
    monaco.editor.setModelLanguage(editor.getModel(), this.value);
});
document.getElementById('speed').addEventListener('input', e => {
    speed = 1000 - parseInt(e.target.value);
});

generateArray();

  
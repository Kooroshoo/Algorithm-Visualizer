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


document.addEventListener('DOMContentLoaded', function () {
  // Mapping of data structures to their respective visualization functions
  const visualizationFunctions = {
      array: visualizeArrayStep,
      string: visualizeStringStep,
      // linkedList: visualizeLinkedListStep,
      // tree: visualizeTreeStep,
      // graph: visualizeGraphStep
  };

  // Generalized visualizeStep function
  window.visualizeStep = async function (...args) {
      const selectedDataStructure = document.getElementById('data-structure-selector').value;

      if (visualizationFunctions[selectedDataStructure]) {
          await visualizationFunctions[selectedDataStructure](...args);
      } else {
          console.error("No visualization function found for", selectedDataStructure);
      }
  };
});


const dsConfig = {
  array: { algorithms: ['bubble', 'selection', 'insertion', 'binarySearch', 'slidingWindow', 'twoPointers'] },
  string: { algorithms: ['slidingWindow', 'twoPointers'] },
  linkedList: { algorithms: ['insertion', 'deletion', 'traversal'] },
  tree: { algorithms: ['BFS', 'DFS', 'inOrder', 'preOrder', 'postOrder'] },
  graph: { algorithms: ['BFS', 'DFS', 'dijkstra'] }
};

// Handle data structure change: Update algorithm options and load default code
document.getElementById('data-structure-selector').addEventListener('change', e => {
  const ds = e.target.value;
  const algoSelect = document.getElementById('algorithm-selector');
  algoSelect.innerHTML = ''; // Clear previous options

  // Populate algorithm options
  dsConfig[ds].algorithms.forEach(alg => {
    const opt = document.createElement('option');
    opt.value = alg;
    opt.textContent = alg;
    algoSelect.appendChild(opt);
  });

  // Load default code and update containers
  loadDefaultCode(ds);
  updateVisualizationContainers(ds);
});

// Update code in editor when algorithm or language changes
['algorithm-selector', 'language-selector'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    const lang = document.getElementById('language-selector').value;
    const alg = document.getElementById('algorithm-selector').value;
    if (window.editor && algorithms[lang] && algorithms[lang][alg]) {
      window.editor.setValue(algorithms[lang][alg]);
      monaco.editor.setModelLanguage(window.editor.getModel(), lang);
    }
  });
});

// Load the default algorithm code for selected DS
function loadDefaultCode(ds) {
  const lang = document.getElementById('language-selector').value;
  const defAlg = dsConfig[ds].algorithms[0];
  const code = algorithms[lang] && algorithms[lang][defAlg] ? algorithms[lang][defAlg] : dsConfig[ds].code[lang];
  window.editor.setValue(code);
}

// Show the corresponding container based on selected data structure
function updateVisualizationContainers(ds) {
  const containers = {
    array: 'array-container-wrapper',
    string: 'string-container-wrapper',
    linkedList: 'linkedListContainer',
    tree: 'treeContainer',
    graph: 'graphContainer'
  };

  // Hide all containers
  Object.keys(containers).forEach(key => {
    const container = document.getElementById(containers[key]);
    if (container) container.style.display = 'none';
  });

  // Show the selected container
  const selectedContainer = containers[ds];
  const containerToShow = document.getElementById(selectedContainer);
  if (containerToShow) {
    containerToShow.style.display = 'block';
  }
}

// Initialize the page by triggering a change event on data structure selector
document.addEventListener('DOMContentLoaded', () => {
  // Initially hide all containers
  const containers = [
    'array-container-wrapper',
    'string-container-wrapper',
    'linkedListContainer',
    'treeContainer',
    'graphContainer'
  ];

  containers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container) {
      container.style.display = 'none'; // Hide all containers at first
    }
  });

  // Set the default data structure selection and show its container
  const defaultDataStructure = document.getElementById('data-structure-selector').value;
  updateVisualizationContainers(defaultDataStructure);
});









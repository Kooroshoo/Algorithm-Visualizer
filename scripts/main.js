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
  // Bind existing controls for arrays
  document.getElementById('run-code').addEventListener('click', window.runCode);
  document.getElementById('generate').addEventListener('click', function() {
      window.generateArray();  
  });
  document.getElementById('speed').addEventListener('input', e => {
      window.speed = 1000 - parseInt(e.target.value) + 1;
  });

  // Bind controls for string operations
  document.getElementById('string-generate').addEventListener('click', function() {
      window.generateString(); // Generate a random string on click
  });

  document.getElementById('string-speed').addEventListener('input', e => {
      window.stringSpeed = 1000 - parseInt(e.target.value) + 1;
  });

  // Generate an initial array and string when the page loads
  window.generateArray();
  window.generateString();
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


// Data Structure Configuration
const dsConfig = {
  array: { 
    algorithms: [
      'select', 'insertion', 'deletion', 'linearSearch',
      'reverse', 'rotate', 'slidingWindow',
      'twoPointers', 'prefixSuffixSum', 'dpFibonacci', 'quickSort',
      'mergeSort', 'heapSort', 'bubbleSort', 'selectionSort', 'insertionSort', 'binarySearch', 
      'kmpSearch', 'matrixMultiply', 'bitManipulation'
    ]
  },  
  string: { 
    algorithms: ['palindrome', 'reverse', 'substring', 'anagram', 'caesar']
  },
  linkedList: { 
    algorithms: ['insertion', 'deletion', 'traversal'] 
  },
  tree: { 
    algorithms: ['BFS', 'DFS', 'inOrder', 'preOrder', 'postOrder'] 
  },
  graph: { 
    algorithms: ['BFS', 'DFS', 'dijkstra'] 
  }
};

// Function to populate algorithm dropdown
function populateAlgorithmDropdown(ds) {
  const algoSelect = document.getElementById('algorithm-selector');
  algoSelect.innerHTML = ''; // Clear previous options

  if (dsConfig[ds] && dsConfig[ds].algorithms.length > 0) {
    dsConfig[ds].algorithms.forEach(alg => {
      const opt = document.createElement('option');
      opt.value = alg;
      opt.textContent = alg;
      algoSelect.appendChild(opt);
    });

    // Select first algorithm and load its code
    algoSelect.value = dsConfig[ds].algorithms[0];
    loadDefaultCode(ds);
  } else {
    console.warn(`No algorithms found for ${ds}`);
  }
}

// Handle DSA selection change
document.getElementById('data-structure-selector').addEventListener('change', e => {
  const ds = e.target.value;
  populateAlgorithmDropdown(ds);
  updateVisualizationContainers(ds);
});

// Update code in editor when selection changes
['algorithm-selector', 'language-selector', 'data-structure-selector'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    const lang = document.getElementById('language-selector').value;
    const alg = document.getElementById('algorithm-selector').value;
    const ds = document.getElementById('data-structure-selector').value;

    if (window.editor && algorithms[ds] && algorithms[ds][lang] && algorithms[ds][lang][alg]) {
      window.editor.setValue(algorithms[ds][lang][alg]);
      monaco.editor.setModelLanguage(window.editor.getModel(), lang);
    } else {
      console.error(`Code for ${ds} - ${lang} - ${alg} not found in algorithms object.`);
    }
  });
});

// Load the default algorithm code for selected DS
function loadDefaultCode(ds) {
  const lang = document.getElementById('language-selector').value;
  const defAlg = dsConfig[ds].algorithms[0]; // Get first algorithm

  if (defAlg && algorithms[ds] && algorithms[ds][lang] && algorithms[ds][lang][defAlg]) {
    window.editor.setValue(algorithms[ds][lang][defAlg]);
  } else {
    console.warn(`No default code found for ${ds} - ${lang}`);
  }
}

// Show the corresponding container based on selected DS
function updateVisualizationContainers(ds) {
  const containers = {
    array: 'array-container-wrapper',
    string: 'string-container-wrapper',
    linkedList: 'linkedListContainer',
    tree: 'treeContainer',
    graph: 'graphContainer'
  };

  // Hide all containers first
  Object.values(containers).forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container) container.style.display = 'none';
  });

  // Show the selected container
  const selectedContainer = document.getElementById(containers[ds]);
  if (selectedContainer) {
    selectedContainer.style.display = 'block';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const defaultDataStructure = document.getElementById('data-structure-selector').value;

  // Hide all containers initially
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
      container.style.display = 'none'; // Ensure all are hidden at start
    }
  });

  // Populate dropdown and show the correct container
  populateAlgorithmDropdown(defaultDataStructure);
  updateVisualizationContainers(defaultDataStructure);
});










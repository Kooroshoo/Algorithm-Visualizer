document.addEventListener("DOMContentLoaded", function() {
  // Initially hide all containers
  toggleArrayContainer(true);
  toggleStringContainer(false);
  toggleLinkedListContainer(false);
  toggleTreeContainer(false);
  toggleGraphContainer(false);

  // Listen for changes in the data structure selector
  document.getElementById('data-structure-selector').addEventListener('change', function(event) {
    // Show and hide containers based on selection
    switch (event.target.value) {
      case 'array':
        toggleArrayContainer(true);
        toggleStringContainer(false);
        toggleLinkedListContainer(false);
        toggleTreeContainer(false);
        toggleGraphContainer(false);
        break;
      case 'string':
        toggleArrayContainer(false);
        toggleStringContainer(true);
        toggleLinkedListContainer(false);
        toggleTreeContainer(false);
        toggleGraphContainer(false);
        break;
      case 'linkedList':
        toggleArrayContainer(false);
        toggleStringContainer(false);
        toggleLinkedListContainer(true);
        toggleTreeContainer(false);
        toggleGraphContainer(false);
        break;
      case 'tree':
        toggleArrayContainer(false);
        toggleStringContainer(false);
        toggleLinkedListContainer(false);
        toggleTreeContainer(true);
        toggleGraphContainer(false);
        break;
      case 'graph':
        toggleArrayContainer(false);
        toggleStringContainer(false);
        toggleLinkedListContainer(false);
        toggleTreeContainer(false);
        toggleGraphContainer(true);
        break;
      default:
        break;
    }
  });

  // Function to toggle the visibility of the array container
  function toggleArrayContainer(show) {
    const arrayContainerWrapper = document.getElementById('array-container-wrapper');
    arrayContainerWrapper.style.display = show ? 'block' : 'none';
  }

  // Function to toggle the visibility of the string container
  function toggleStringContainer(show) {
    const stringContainer = document.getElementById('stringContainer');
    stringContainer.style.display = show ? 'block' : 'none';
  }

  // Function to toggle the visibility of the linked list container
  function toggleLinkedListContainer(show) {
    const linkedListContainer = document.getElementById('linkedListContainer');
    linkedListContainer.style.display = show ? 'block' : 'none';
  }

  // Function to toggle the visibility of the tree container
  function toggleTreeContainer(show) {
    const treeContainer = document.getElementById('treeContainer');
    treeContainer.style.display = show ? 'block' : 'none';
  }

  // Function to toggle the visibility of the graph container
  function toggleGraphContainer(show) {
    const graphContainer = document.getElementById('graphContainer');
    graphContainer.style.display = show ? 'block' : 'none';
  }
});

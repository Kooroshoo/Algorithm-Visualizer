// scripts/dataStructureSwitcher.js

document.addEventListener("DOMContentLoaded", function () {
  // Initially show only the array container and hide the rest.
  toggleArrayContainer(true);
  toggleStringContainer(false);
  toggleLinkedListContainer(false);
  toggleTreeContainer(false);
  toggleGraphContainer(false);

  // Listen for changes in the data structure selector.
  document.getElementById('data-structure-selector').addEventListener('change', function (event) {
    const value = event.target.value;
    toggleArrayContainer(value === 'array');
    toggleStringContainer(value === 'string');
    toggleLinkedListContainer(value === 'linkedList');
    toggleTreeContainer(value === 'tree');
    toggleGraphContainer(value === 'graph');
  });

  // Toggle functions for each container.
  function toggleArrayContainer(show) {
    const wrapper = document.getElementById('array-container-wrapper');
    if (wrapper) wrapper.style.display = show ? 'block' : 'none';
  }

  function toggleStringContainer(show) {
    const container = document.getElementById('string-container-wrapper');
    if (container) container.style.display = show ? 'block' : 'none';
  }

  function toggleLinkedListContainer(show) {
    const container = document.getElementById('linkedListContainer');
    if (container) container.style.display = show ? 'block' : 'none';
  }

  function toggleTreeContainer(show) {
    const container = document.getElementById('treeContainer');
    if (container) container.style.display = show ? 'block' : 'none';
  }

  function toggleGraphContainer(show) {
    const container = document.getElementById('graphContainer');
    if (container) container.style.display = show ? 'block' : 'none';
  }
});

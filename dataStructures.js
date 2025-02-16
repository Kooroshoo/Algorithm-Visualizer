/* scripts/dataStructures.js */
function setActiveDataStructure(dataStructure) {
    const containers = document.querySelectorAll('.data-structure-container');
    containers.forEach(container => {
      container.classList.remove('active');
    });
    const activeContainer = document.getElementById(dataStructure + '-container');
    if (activeContainer) {
      activeContainer.classList.add('active');
    }
  }
  
  // Listen for changes on the data structure selector
  document.getElementById('data-structure-selector').addEventListener('change', function() {
    setActiveDataStructure(this.value);
  });
  
  // Initialize the active container on page load (default is "array")
  setActiveDataStructure(document.getElementById('data-structure-selector').value);
  
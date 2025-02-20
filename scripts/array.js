// scripts/array.js

// We wait until the DOM is loaded so that the container element exists.
document.addEventListener('DOMContentLoaded', function () {
    const arrayContainer = document.getElementById('arrayContainer');
  
    // Global function to generate a random array and update the visualization.
    window.generateArray = function (num = 20) {
      window.array = Array.from({ length: num }, () => Math.floor(Math.random() * 280) + 20);
      arrayContainer.innerHTML = window.array
        .map(
          value => `
        <div class="bar" style="height: ${value}px">
          <span>${value}</span>
        </div>
      `
        )
        .join('');
      window.logToConsole && window.logToConsole('Generated new array');
    };
    
  });

  // Global function to animate one step by updating the visualization and pausing.
  window.visualizeArrayStep = async function (arr, comparingIndices = [], sortedIndices = []) {
    const bars = document.getElementById('arrayContainer').getElementsByClassName('bar');
    arr.forEach((value, i) => {
      if (bars[i]) {
        // Update the height and text content if a span exists.
        bars[i].style.height = `${value}px`;
        const span = bars[i].querySelector('span');
        if (span) span.textContent = value;
        
        // Update the class based on the indices.
        bars[i].className = 'bar' +
          (comparingIndices.includes(i) ? ' comparing' : '') +
          (sortedIndices.includes(i) ? ' sorted' : '');
      }
    });
    
    // Pause for the specified speed.
    await new Promise(resolve => setTimeout(resolve, window.speed || 500));
  };
  
  
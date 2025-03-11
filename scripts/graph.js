// scripts/graph.js

// Wait until the DOM is loaded so that the container element exists.
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('graphContainer');
    
    // Insert a canvas element into the container.
    container.innerHTML = '<canvas id="graphContainer" width="600" height="400"></canvas>';
    const canvas = document.getElementById('graphContainer');
    const ctx = canvas.getContext('2d');
    
    // Graph data structure.
    let graph = { nodes: [], edges: [], adjacencyList: {} };
    
    // Helper: Get CSS variable value.
    function getCssVar(variable) {
      return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    }
    
    // Function to generate a random graph.
    window.generateGraph = function () {
      const numNodes = 8;
      const radius = 150;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create nodes arranged in a circle.
      graph.nodes = Array.from({ length: numNodes }, (_, i) => ({
        id: i,
        x: centerX + radius * Math.cos((2 * Math.PI * i) / numNodes),
        y: centerY + radius * Math.sin((2 * Math.PI * i) / numNodes)
      }));
      
      graph.adjacencyList = {};
      graph.edges = [];
      
      // Create random edges for each node.
      graph.nodes.forEach(node => {
        graph.adjacencyList[node.id] = [];
        const numEdges = Math.floor(Math.random() * 2) + 1;
        const possibleTargets = graph.nodes
          .filter(n => n.id !== node.id)
          .sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < numEdges && i < possibleTargets.length; i++) {
          const target = possibleTargets[i].id;
          const weight = Math.floor(Math.random() * 9) + 1;
          graph.edges.push({ from: node.id, to: target, weight });
          graph.adjacencyList[node.id].push({ to: target, weight });
        }
      });
      
      drawGraph();
      window.logToConsole && window.logToConsole('Generated new graph');
    };
    
    // Function to draw the graph based on graph data.
    function drawGraph() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges with arrows.
      graph.edges.forEach(edge => {
        const fromNode = graph.nodes.find(n => n.id === edge.from);
        const toNode = graph.nodes.find(n => n.id === edge.to);
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const angle = Math.atan2(dy, dx);
        
        // Draw the line.
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = getCssVar('--secondary');
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw arrowhead at target.
        ctx.save();
        ctx.translate(toNode.x, toNode.y);
        ctx.rotate(angle);
        ctx.fillStyle = getCssVar('--secondary');
        ctx.beginPath();
        ctx.moveTo(-15, -8);
        ctx.lineTo(0, 0);
        ctx.lineTo(-15, 8);
        ctx.fill();
        ctx.restore();
        
        // Draw weight label.
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(edge.weight, (fromNode.x + toNode.x) / 2 + 10, (fromNode.y + toNode.y) / 2 + 10);
      });
      
      // Draw nodes.
      graph.nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
        
        // Shadow effect.
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        
        // Node fill.
        ctx.fillStyle = getCssVar('--primary');
        ctx.fill();
        
        // Node border.
        ctx.lineWidth = 2;
        ctx.strokeStyle = getCssVar('--node-border');
        ctx.stroke();
        
        // Reset shadow.
        ctx.shadowColor = 'transparent';
        
        // Node label.
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, node.x, node.y);
      });
    }
    
    // Global function to animate one step by updating the graph visualization and pausing.
    window.visualizeGraphStep = async function (nodeId, state) {
      const node = graph.nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      // Redraw graph first.
      drawGraph();
      
      // Define colors for different states.
      const colors = {
        active: getCssVar('--highlight'),
        visited: '#4CAF50',
        processed: getCssVar('--primary'),
        path: '#FFC107'
      };
      
      // Animate pulse effect.
      const animate = async () => {
        for (let i = 0; i < 3; i++) {
          const size = 24 + i * 3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          ctx.strokeStyle = colors[state] + (40 - i * 15);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      };
      
      // Draw the node with a new color.
      ctx.beginPath();
      ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
      ctx.fillStyle = colors[state] || getCssVar('--primary');
      ctx.fill();
      ctx.strokeStyle = getCssVar('--node-border');
      ctx.stroke();
      
      // Redraw the node label.
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(node.id, node.x, node.y);
      
      await animate();
      await new Promise(resolve => setTimeout(resolve, window.graphSpeed || 500));
    };
    
    // Optional: Global log function.
    window.logToConsole = function(message) {
      const consoleOutput = document.getElementById('console');
      consoleOutput.innerHTML += `<div>> ${message}</div>`;
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    };

    // Make graph available globally.
    window.graph = graph;
});

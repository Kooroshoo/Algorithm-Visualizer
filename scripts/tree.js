// scripts/tree.js

// Wait until the DOM is loaded so that the container element exists.
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('treeContainer');
    
    // Map to store node elements by their value.
    let nodes = new Map();
    let tree = null;
  
    // Function to calculate positions for each tree node.
    function calculatePositions(node, level = 0, pos = { x: 0, y: 0 }, positions = [], depth = 0) {
      if (!node) return;
  
      const horizontalSpacing = 150;
      const verticalSpacing = 100;
  
      // Process left child: move left based on depth.
      if (node.left) {
        pos.x -= horizontalSpacing / (depth + 1);
        calculatePositions(node.left, level + 1, pos, positions, depth + 1);
      }
  
      // Record current node's position.
      positions.push({
        value: node.value,
        x: pos.x,
        y: level * verticalSpacing + 50
      });
  
      // Process right child: move right based on depth.
      if (node.right) {
        pos.x += horizontalSpacing / (depth + 1);
        calculatePositions(node.right, level + 1, pos, positions, depth + 1);
      }
  
      return positions;
    }
  
    // Function to draw the tree based on calculated positions.
    function drawTree(root) {
      container.innerHTML = '';
      nodes.clear();
      
      if (!root) return;
  
      // Start at the middle of the container.
      const initialX = container.clientWidth / 2;
      const positions = calculatePositions(root, 0, { x: initialX, y: 0 }) || [];
      
      const connections = [];
  
      function processNode(node, parentPos) {
        if (!node) return;
        
        const currentPos = positions.find(p => p.value === node.value);
        if (parentPos) {
          connections.push({ from: parentPos, to: currentPos });
        }
        
        if (node.left) processNode(node.left, currentPos);
        if (node.right) processNode(node.right, currentPos);
      }
      
      processNode(root, null);
      
      // Draw the connecting edges.
      connections.forEach(conn => {
        const line = document.createElement('div');
        line.className = 'tree-edge';
        const length = Math.sqrt(
          Math.pow(conn.to.x - conn.from.x, 2) +
          Math.pow(conn.to.y - conn.from.y, 2)
        );
        const angle = Math.atan2(conn.to.y - conn.from.y, conn.to.x - conn.from.x);
        
        line.style.width = `${length}px`;
        line.style.left = `${conn.from.x + 25}px`;
        line.style.top = `${conn.from.y + 25}px`;
        line.style.transform = `rotate(${angle}rad)`;
        container.appendChild(line);
      });
      
      // Draw the nodes.
      positions.forEach(pos => {
        const nodeElem = document.createElement('div');
        nodeElem.className = 'tree-node';
        nodeElem.textContent = pos.value;
        nodeElem.style.left = `${pos.x}px`;
        nodeElem.style.top = `${pos.y}px`;
        nodes.set(pos.value, nodeElem);
        container.appendChild(nodeElem);
      });
    }
    
    // Global function to generate a random BST and update the visualization.
    window.generateTree = async function () {
      tree = null;
      const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 1);
      
      async function insertNode(root, value) {
        if (!root) return { value, left: null, right: null };
        if (value < root.value) {
          root.left = await insertNode(root.left, value);
        } else {
          root.right = await insertNode(root.right, value);
        }
        return root;
      }
      
      for (const value of values) {
        tree = await insertNode(tree, value);
      }
      drawTree(tree);
      window.logToConsole && window.logToConsole('Generated new tree');
    };
    
    // Global function to animate one step by updating the tree visualization and pausing.
    window.visualizeTreeStep = async function (value, action) {
        if (action === 'visit') {
          // Ensure the value is a number, matching the keys in the nodes Map
          const key = Number(value);
          const nodeElem = nodes.get(key);
          if (!nodeElem) {
            console.error(`Node with value ${key} not found`);
            return;
          }
          nodeElem.classList.add('active');
          await new Promise(resolve => setTimeout(resolve, window.speed || 500));
          nodeElem.classList.remove('active');
        }
        else if (action === 'insert') {
          drawTree(tree);
          await new Promise(resolve => setTimeout(resolve, window.speed || 500));
        }
        else if (action === 'complete') {
          Array.from(nodes.values()).forEach(nodeElem => nodeElem.classList.add('visited'));
        }
      };
  });
  
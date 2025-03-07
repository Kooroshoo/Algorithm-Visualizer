// scripts/linked-list.jsy

document.addEventListener('DOMContentLoaded', function () {
    const listContainer = document.getElementById('linkedListContainer');

    window.ListNode = class ListNode {
        constructor(value, next = null) {
            this.value = value;
            this.next = next;
        }
    }

    // Global function to generate a random linked list and update the visualization.
    window.generateLinkedList = function (length = 5) {
        window.head = null;
        let current = null;
        for (let i = 0; i < length; i++) {
            const value = Math.floor(Math.random() * 90) + 10;
            if (!window.head) {
                window.head = new ListNode(value);
                current = window.head;
            } else {
                current.next = new ListNode(value);
                current = current.next;
            }
        }
        visualizeLinkedList(window.head);
        window.logToConsole && window.logToConsole('Generated new linked-list');
    };

    // Global function to animate one step by updating the visualization and pausing.
    window.visualizeLinkedListStep = async function (highlightNode = null, found = false, startNode = window.head) {
        visualizeLinkedList(startNode, highlightNode, found);
        await new Promise(resolve => setTimeout(resolve, window.linkedListSpeed || 500));
    };

    function visualizeLinkedList(head, highlightNode = null, found = false) {
        listContainer.innerHTML = '';
        let current = head;

        while (current) {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            
            const nodeBox = document.createElement('div');
            nodeBox.className = 'node-box' + 
                (current === highlightNode ? ' highlight' : '') +
                (found ? ' sorted' : '');

            nodeBox.innerHTML = `
                <div class="data">${current.value}</div>
                <div class="next">${current.next ? '→' : '∅'}</div>
            `;

            nodeElement.appendChild(nodeBox);
            listContainer.appendChild(nodeElement);
            current = current.next;

            if (current) {
                const arrow = document.createElement('div');
                arrow.className = 'arrow';
                arrow.textContent = '→';
                listContainer.appendChild(arrow);
            }
        }
    }
});
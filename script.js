const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set replicanti count to 1
document.getElementById('replicanti-count').innerText = 1;

// Example: draw a rectangle
context.fillStyle = 'green';
context.fillRect(10, 10, 100, 100);

// Game logic here

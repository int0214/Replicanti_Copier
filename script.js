let replicantiCount = 1;
let replicantiMultiplier = 2;
let timeMultiplier = 128;

document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier;
document.getElementById('time-multiplier').innerText = timeMultiplier;

document.getElementById('nerfs-button').addEventListener('click', function() {
    var nerfsContainer = document.getElementById('nerfs-container');
    var nerfsButton = document.getElementById('nerfs-button');

    if (nerfsContainer.style.display === 'none') {
        nerfsContainer.style.display = 'block';
        nerfsButton.after(nerfsContainer); // Move the box below the button
    } else {
        nerfsContainer.style.display = 'none';
    }
});

// Function to update replicanti count based on multiplier and time multiplier
function updateReplicanti() {
    replicantiCount *= Math.pow(replicantiMultiplier, 1 / timeMultiplier);
    document.getElementById('replicanti-count').innerText = parseFloat(replicantiCount).toFixed(3);
}

// Call the update function every second
setInterval(updateReplicanti, 1000);

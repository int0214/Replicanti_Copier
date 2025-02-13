let replicantiCount = 1;
let replicantiMultiplier = 2;

document.getElementById('replicanti-count').innerText = replicantiCount;
document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier;

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

// Example function to update replicanti count and multiplier
function updateReplicanti() {
    replicantiCount *= replicantiMultiplier;
    document.getElementById('replicanti-count').innerText = replicantiCount;
}

// Call the update function every second
setInterval(updateReplicanti, 1000);

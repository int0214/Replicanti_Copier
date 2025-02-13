document.addEventListener('DOMContentLoaded', (event) => {
    let replicantiCount = parseFloat(localStorage.getItem('replicantiCount')) || 1;
    let replicantiMultiplier = parseFloat(localStorage.getItem('replicantiMultiplier')) || 2;
    let timeMultiplier = parseFloat(localStorage.getItem('timeMultiplier')) || 128;
    let voidPoints = parseInt(localStorage.getItem('voidPoints')) || 0;
    let playTime = parseFloat(localStorage.getItem('playTime')) || 0;

    document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
    document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
    document.getElementById('time-multiplier').innerText = timeMultiplier;
    document.getElementById('play-time').innerText = playTime.toFixed(2);

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

    document.getElementById('reset-button').addEventListener('click', function() {
        replicantiCount = 0;
        voidPoints += 1;
        playTime = 0;
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('void-points').innerText = voidPoints;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'block';
        updateReplicantiMultiplier(); // Update multiplier on reset
        saveGameData();
    });

    document.getElementById('hard-reset-button').addEventListener('click', function() {
        replicantiCount = 1;
        replicantiMultiplier = 2;
        timeMultiplier = 128;
        voidPoints = 0;
        playTime = 0;
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('time-multiplier').innerText = timeMultiplier;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'none';
        updateReplicantiMultiplier(); // Update multiplier on hard reset
        saveGameData();
    });

    function updateReplicantiMultiplier() {
        let nerf = Math.sqrt(replicantiCount); // Calculate nerf value
        replicantiMultiplier = 1 + (replicantiMultiplier - 1) / nerf; // Update replicanti multiplier based on nerf
    }

    // Function to update replicanti count based on multiplier and time multiplier
    function updateReplicanti() {
        replicantiCount *= Math.pow(replicantiMultiplier, 0.1 / timeMultiplier); // Adjusted interval to 0.1 seconds
        playTime += 0.1 / timeMultiplier; // Adjust play time by the time multiplier (dividing)
        updateReplicantiMultiplier(); // Call to update multiplier
        document.getElementById('replicanti-count').innerText = parseFloat(replicantiCount).toFixed(3);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('productionDivisor1').innerText = Math.sqrt(replicantiCount).toFixed(3);
        document.getElementById('play-time').innerText = playTime.toFixed(2);

        if (replicantiCount < 1) {
            document.getElementById('reset-button').style.display = 'block';
        } else {
            document.getElementById('reset-button').style.display = 'none';
        }
        saveGameData();
    }

    // Function to save game data to localStorage
    function saveGameData() {
        localStorage.setItem('replicantiCount', replicantiCount);
        localStorage.setItem('replicantiMultiplier', replicantiMultiplier);
        localStorage.setItem('timeMultiplier', timeMultiplier);
        localStorage.setItem('voidPoints', voidPoints);
        localStorage.setItem('playTime', playTime);
    }

    // Call the update function every 0.1 second
    setInterval(updateReplicanti, 100);
});

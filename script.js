document.addEventListener('DOMContentLoaded', (event) => {
    let replicantiCount = parseFloat(localStorage.getItem('replicantiCount')) || 1;
    let replicantiMultiplier = parseFloat(localStorage.getItem('replicantiMultiplier')) || 2;
    let timeMultiplier = parseFloat(localStorage.getItem('timeMultiplier')) || 128;
    let voidPoints = parseInt(localStorage.getItem('voidPoints')) || 0;
    let playTime = parseFloat(localStorage.getItem('playTime')) || 0;
    let intervalId;

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
        clearInterval(intervalId); // Stop updating replicanti count
        replicantiCount = 0;
        voidPoints += 1;
        playTime = 0;
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('void-points').innerText = voidPoints;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'block';
        saveGameData();
        startUpdating(); // Restart updating replicanti count
    });

    document.getElementById('hard-reset-button').addEventListener('click', function() {
        clearInterval(intervalId); // Stop updating replicanti count
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
        saveGameData();
        startUpdating(); // Restart updating replicanti count
    });

    // Set replicanti multiplier based on nerf
    let nerf = Math.sqrt(replicantiCount);
    replicantiMultiplier = 1 + (replicantiMultiplier - 1) / nerf;

    // Function to update replicanti count based on multiplier and time multiplier
    function updateReplicanti() {
        replicantiCount *= Math.pow(replicantiMultiplier, 0.1 / timeMultiplier); // Adjusted interval to 0.1 seconds
        playTime += 0.1 / timeMultiplier; // Adjust play time by the time multiplier (dividing)
        nerf = Math.sqrt(replicantiCount); // Update nerf value based on current replicanti count
        document.getElementById('replicanti-count').innerText = parseFloat(replicantiCount).toFixed(3);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('productionDivisor1').innerText = nerf.toFixed(3);
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

    // Function to start updating replicanti count
    function startUpdating() {
        intervalId = setInterval(updateReplicanti, 100);
    }

    // Start updating replicanti count on page load
    startUpdating();
});

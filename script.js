document.addEventListener('DOMContentLoaded', (event) => {
    let replicantiCount = parseFloat(localStorage.getItem('replicantiCount')) || 1;
    let effectiveReplicanti = parseFloat(localStorage.getItem('effectiveReplicanti')) || 0.5;
    let replicantiMultiplier = parseFloat(localStorage.getItem('replicantiMultiplier')) || 2;
    let originalReplicantiMultiplier = parseFloat(localStorage.getItem('originalReplicantiMultiplier')) || replicantiMultiplier; // Store the original value
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
        saveGameData();
    });

    document.getElementById('hard-reset-button').addEventListener('click', function() {
        replicantiCount = 1;
        replicantiMultiplier = 2; // Reset to initial value
        originalReplicantiMultiplier = replicantiMultiplier; // Reset original value
        timeMultiplier = 128;
        voidPoints = 0;
        playTime = 0;
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('time-multiplier').innerText = timeMultiplier;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'none';
        saveGameData();
    });

    function updateReplicantiMultiplier() {
        let productionDivisor = Math.pow(playTime, 2); // Calculate production divisor
        let nerf = Math.sqrt(replicantiCount); // Calculate nerf value
        replicantiMultiplier = 1 + (originalReplicantiMultiplier - 1) / nerf / productionDivisor; // Use original value for calculation
    }

    function updateReplicanti() {

        if (productionDivisor !== 0) {
            replicantiCount += (replicantiCount^effectiveReplicanti)*Math.pow(replicantiMultiplier, 0.1 / timeMultiplier); // Adjusted interval to 0.1 seconds
            replicantiCount /= Math.pow(2, (0.1 / timeMultiplier)); // Divide replicanti by 2 every second, affected by time multiplier
        }

        playTime += 0.1 / timeMultiplier; // Adjust play time by the time multiplier (dividing)
        updateReplicantiMultiplier(); // Call to update multiplier
        document.getElementById('replicanti-count').innerText = parseFloat(replicantiCount).toFixed(3);
        document.getElementById('effectiveReplicanti').innerText = parseFloat(effectiveReplicanti).toFixed(1);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('productionDivisor1').innerText = Math.sqrt(replicantiCount).toFixed(3);
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('productionDivisor2').innerText = productionDivisor.toFixed(3); // Update productionDivisor2

        if (replicantiCount < 1) {
            document.getElementById('reset-button').style.display = 'block';
        } else {
            document.getElementById('reset-button').style.display = 'none';
        }
        saveGameData();
    }

    function saveGameData() {
        localStorage.setItem('replicantiCount', replicantiCount);
        localStorage.setItem('effectiveReplicanti', effectiveReplicanti);
        localStorage.setItem('replicantiMultiplier', replicantiMultiplier);
        localStorage.setItem('originalReplicantiMultiplier', originalReplicantiMultiplier);
        localStorage.setItem('timeMultiplier', timeMultiplier);
        localStorage.setItem('voidPoints', voidPoints);
        localStorage.setItem('playTime', playTime);
    }

    setInterval(updateReplicanti, 100);
});

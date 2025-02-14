document.addEventListener('DOMContentLoaded', (event) => {
    let replicantiCount = parseFloat(localStorage.getItem('replicantiCount')) || 1;
    let effectiveReplicanti = parseFloat(localStorage.getItem('effectiveReplicanti')) || 0.5;
    let replicantiMultiplier = parseFloat(localStorage.getItem('replicantiMultiplier')) || 2;
    let originalReplicantiMultiplier = parseFloat(localStorage.getItem('originalReplicantiMultiplier')) || replicantiMultiplier; // Store the original value
    let timeMultiplier = parseFloat(localStorage.getItem('timeMultiplier')) || 128;
    let voidPoints = parseInt(localStorage.getItem('voidPoints')) || 0;
    let playTime = parseFloat(localStorage.getItem('playTime')) || 0.1 / timeMultiplier;
    let isResetting = false;
    let replicantiDivisor = parseFloat(localStorage.getItem('replicantiDivisor')) || 2; // Add replicantiDivisor

    // Update the UI with initial values
    document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
    document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
    document.getElementById('time-multiplier').innerText = timeMultiplier;
    document.getElementById('play-time').innerText = playTime.toFixed(2);
    document.getElementById('void-points').innerText = voidPoints;
    document.getElementById('replicantiDivisor').innerText = replicantiDivisor.toFixed(2); // Update replicantiDivisor

    // Show void points container if voidPoints > 0 and hide reset button
    if (voidPoints > 0) {
        document.getElementById('void-points-container').style.display = 'block';
        document.getElementById('reset-button').style.display = 'none';
    }

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
        if (isResetting) return;
        isResetting = true;
        replicantiCount = 1;
        voidPoints += 1;
        playTime = 0.1 / timeMultiplier;
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('void-points').innerText = voidPoints;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'block';
        document.getElementById('reset-button').style.display = 'none';
        saveGameData();
        setTimeout(() => { isResetting = false; }, 300); // Prevent multiple clicks by disabling for 300ms
    });

    document.getElementById('hard-reset-button').addEventListener('click', function() {
        replicantiCount = 1;
        replicantiMultiplier = 2; // Reset to initial value
        originalReplicantiMultiplier = replicantiMultiplier; // Reset original value
        timeMultiplier = 128;
        voidPoints = 0;
        playTime = 0.1 / timeMultiplier;
        replicantiDivisor = 2; // Reset replicantiDivisor
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('time-multiplier').innerText = timeMultiplier;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'none';
        document.getElementById('replicantiDivisor').innerText = replicantiDivisor.toFixed(2); // Update replicantiDivisor
        saveGameData();
    });

    document.getElementById('upgrade-time-multiplier').addEventListener('click', function() {
        timeMultiplier /= 2;
        document.getElementById('time-multiplier').innerText = timeMultiplier;
        saveGameData();
    });

    document.getElementById('upgrade-replicanti-multiplier').addEventListener('click', function() {
        originalReplicantiMultiplier *= 2;
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        saveGameData();
    });

    document.getElementById('upgrade-replicanti-divisor').addEventListener('click', function() {
        replicantiDivisor /= 1.5;
        document.getElementById('replicantiDivisor').innerText = replicantiDivisor.toFixed(3);
        saveGameData();
    });

    function updateReplicantiMultiplier() {
        let productionDivisor = Math.pow(playTime * 10, 2); // Calculate production divisor
        let nerf = Math.sqrt(replicantiCount); // Calculate nerf value
        replicantiMultiplier = 1 + (originalReplicantiMultiplier - 1) / nerf / productionDivisor; // Use original value for calculation
    }

    function updateReplicanti() {
        let productionDivisor = Math.pow(playTime * 10, 2); // Calculate production divisor
        let nerf = Math.sqrt(replicantiCount); // Calculate nerf value

        replicantiCount *= Math.pow(Math.pow(replicantiCount, effectiveReplicanti), 0.1 / timeMultiplier) * Math.pow(replicantiMultiplier, 0.1 / timeMultiplier);
        replicantiCount /= Math.pow(replicantiDivisor, (0.1 / timeMultiplier)); // Divide replicanti by the replicantiDivisor every second, affected by time multiplier

        updateReplicantiMultiplier(); // Call to update multiplier

        playTime += 0.1 / timeMultiplier; // Adjust play time by the time multiplier (dividing)
        document.getElementById('replicanti-count').innerText = parseFloat(replicantiCount).toFixed(3);
        document.getElementById('effectiveReplicanti').innerText = parseFloat(effectiveReplicanti).toFixed(1);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('productionDivisor1').innerText = nerf.toFixed(3);
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
        localStorage.setItem('replicantiDivisor', replicantiDivisor); // Save replicantiDivisor
    }

    setInterval(updateReplicanti, 100);
});

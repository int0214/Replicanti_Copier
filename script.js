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
    let boughtTimeMultiplier = parseInt(localStorage.getItem('boughtTimeMultiplier')) || 0;
    let boughtReplicantiMultiplier = parseInt(localStorage.getItem('boughtReplicantiMultiplier')) || 0;
    let boughtReplicantiDivisor = parseInt(localStorage.getItem('boughtReplicantiDivisor')) || 0;
    let boughtVoidGain = parseInt(localStorage.getItem('boughtVoidGain')) || 0;
    let boughtVoidChallenge = parseInt(localStorage.getItem('boughtVoidChallenge')) || 0;
    let boughtVoidSpeed = parseInt(localStorage.getItem('boughtVoidSpeed')) || 0;
    let voidSpeedStatus = localStorage.getItem('voidSpeedStatus') || 'Slower';

    function calculateCost(upgradeBought, baseFactor, powerFactor) {
        return Math.pow(10, Math.floor(Math.pow((upgradeBought + 1), baseFactor) + (powerFactor * upgradeBought * upgradeBought)));
    }

    function updateUpgradeCosts() {
        document.getElementById('cost-time-multiplier').innerText = calculateCost(boughtTimeMultiplier, 1.5, 0.1) + ' replicanti';
        document.getElementById('cost-replicanti-multiplier').innerText = calculateCost(boughtReplicantiMultiplier, 1.25, 0.075) + ' replicanti';
        document.getElementById('cost-replicanti-divisor').innerText = calculateCost(boughtReplicantiDivisor, 1.1, 0.05) + ' replicanti';
        document.getElementById('cost-void-gain').innerText = calculateCost(boughtVoidGain, 1.5, 0.1) + ' VP';
        document.getElementById('cost-void-challenge').innerText = calculateCost(boughtVoidChallenge, 1.25, 0.075) + ' VP';
        document.getElementById('cost-void-speed').innerText = calculateCost(boughtVoidSpeed, 1.1, 0.05) + ' VP';
    }

    function updateUpgradeCounts() {
        document.getElementById('bought-time-multiplier').innerText = boughtTimeMultiplier;
        document.getElementById('bought-replicanti-multiplier').innerText = boughtReplicantiMultiplier;
        document.getElementById('bought-replicanti-divisor').innerText = boughtReplicantiDivisor;
        document.getElementById('bought-void-gain').innerText = boughtVoidGain;
        document.getElementById('bought-void-challenge').innerText = boughtVoidChallenge;
        document.getElementById('bought-void-speed').innerText = boughtVoidSpeed;
        document.getElementById('void-speed-status').innerText = voidSpeedStatus;
    }

    function updateAll() {
        updateUpgradeCosts();
        updateUpgradeCounts();
    }

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

    document.getElementById('replicanti-button').addEventListener('click', function() {
        var upgradesContainer = document.getElementById('upgrades-container');
        var nerfsContainer = document.getElementById('nerfs-container');
        var voidUpgradesContainer = document.getElementById('void-upgrades-container');
        if (upgradesContainer.style.display === 'none') {
            upgradesContainer.style.display = 'block';
            nerfsContainer.style.display = 'none';
            voidUpgradesContainer.style.display = 'none';
        } else {
            upgradesContainer.style.display = 'none';
        }
    });

    document.getElementById('nerfs-button').addEventListener('click', function() {
        var nerfsContainer = document.getElementById('nerfs-container');
        var upgradesContainer = document.getElementById('upgrades-container');
        var voidUpgradesContainer = document.getElementById('void-upgrades-container');
        if (nerfsContainer.style.display === 'none') {
            nerfsContainer.style.display = 'block';
            upgradesContainer.style.display = 'none';
            voidUpgradesContainer.style.display = 'none';
        } else {
            nerfsContainer.style.display = 'none';
        }
    });

    document.getElementById('void-button').addEventListener('click', function() {
        var voidUpgradesContainer = document.getElementById('void-upgrades-container');
        var nerfsContainer = document.getElementById('nerfs-container');
        var upgradesContainer = document.getElementById('upgrades-container');
        if (voidUpgradesContainer.style.display === 'none') {
            voidUpgradesContainer.style.display = 'block';
            nerfsContainer.style.display = 'none';
            upgradesContainer.style.display = 'none';
        } else {
            voidUpgradesContainer.style.display = 'none';
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
        boughtTimeMultiplier = 0;
        boughtReplicantiMultiplier = 0;
        boughtReplicantiDivisor = 0;
        boughtVoidGain = 0;
        boughtVoidChallenge = 0;
        boughtVoidSpeed = 0;
        voidSpeedStatus = 'Slower';
        document.getElementById('replicanti-count').innerText = replicantiCount.toFixed(3);
        document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
        document.getElementById('time-multiplier').innerText = timeMultiplier;
        document.getElementById('play-time').innerText = playTime.toFixed(2);
        document.getElementById('void-points-container').style.display = 'none';
        document.getElementById('replicantiDivisor').innerText = replicantiDivisor.toFixed(2); // Update replicantiDivisor
        updateAll();
        saveGameData();
    });

    document.getElementById('upgrade-time-multiplier').addEventListener('click', function() {
        let cost = calculateCost(boughtTimeMultiplier, 1.5, 0.1);
        if (voidPoints >= cost) {
            voidPoints -= cost;
            timeMultiplier /= 2;
            boughtTimeMultiplier++;
            document.getElementById('time-multiplier').innerText = timeMultiplier;
            document.getElementById('void-points').innerText = voidPoints;
            updateAll();
            saveGameData();
        }
    });

    document.getElementById('upgrade-replicanti-multiplier').addEventListener('click', function() {
        let cost = calculateCost(boughtReplicantiMultiplier, 1.25, 0.075);
        if (voidPoints >= cost) {
            voidPoints -= cost;
            originalReplicantiMultiplier *= 2;
            boughtReplicantiMultiplier++;
            document.getElementById('replicanti-multiplier').innerText = replicantiMultiplier.toFixed(3);
            document.getElementById('void-points').innerText = voidPoints;
            updateAll();
            saveGameData();
        }
    });

    document.getElementById('upgrade-replicanti-divisor').addEventListener('click', function() {
        let cost = calculateCost(boughtReplicantiDivisor, 1.1, 0.05);
        if (voidPoints >= cost) {
            voidPoints -= cost;
            replicantiDivisor /= 1.5;
            boughtReplicantiDivisor++;
            document.getElementById('replicantiDivisor').innerText = replicantiDivisor.toFixed(3);
            document.getElementById('void-points').innerText = voidPoints;
            updateAll();
            saveGameData();
        }
    });

    document.getElementById('upgrade-void-gain').addEventListener('click', function() {
        let cost = calculateCost(boughtVoidGain, 1.5, 0.1);
        if (voidPoints >= cost) {
            voidPoints -= cost;
            boughtVoidGain++;
            document.getElementById('void-points').innerText = voidPoints;
            updateAll();
            saveGameData();
        }
    });

    document.getElementById('upgrade-void-challenge').addEventListener('click', function() {
        let cost = calculateCost(boughtVoidChallenge, 1.25, 0.075);
        if (voidPoints >= cost) {
            voidPoints -= cost;
            boughtVoidChallenge++;
            document.getElementById('void-points').innerText = voidPoints;
            updateAll();
            saveGameData();
        }
    });

    document.getElementById('upgrade-void-speed').addEventListener('click', function() {
        let cost = calculateCost(boughtVoidSpeed, 1.1, 0.05);
        if (voidPoints >= cost) {
            voidPoints -= cost;
            boughtVoidSpeed++;
            document.getElementById('void-points').innerText = voidPoints;
            updateAll();
            saveGameData();
        }
    });

    document.getElementById('toggle-void-speed').addEventListener('click', function() {
        if (voidSpeedStatus === 'Slower') {
            voidSpeedStatus = 'Faster';
        } else {
            voidSpeedStatus = 'Slower';
        }
        document.getElementById('void-speed-status').innerText = voidSpeedStatus;
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
         localStorage.setItem('boughtTimeMultiplier', boughtTimeMultiplier);
         localStorage.setItem('boughtReplicantiMultiplier', boughtReplicantiMultiplier);
         localStorage.setItem('boughtReplicantiDivisor', boughtReplicantiDivisor);
         localStorage.setItem('boughtVoidGain', boughtVoidGain);
         localStorage.setItem('boughtVoidChallenge', boughtVoidChallenge);
         localStorage.setItem('boughtVoidSpeed', boughtVoidSpeed);
         localStorage.setItem('voidSpeedStatus', voidSpeedStatus);
     }
 
     updateAll();
     setInterval(updateReplicanti, 100);
 });

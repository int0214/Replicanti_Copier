document.getElementById('replicanti-count').innerText = 1;

document.getElementById('nerfs-button').addEventListener('click', function() {
    var nerfsContainer = document.getElementById('nerfs-container');
    var nerfsButton = document.getElementById('nerfs-button');

    if (nerfsContainer.style.display === 'none') {
        nerfsContainer.style.display = 'block';
        nerfsButton.innerText = 'Nerfs';
    } else {
        nerfsContainer.style.display = 'none';
        nerfsButton.innerText = 'Nerfs';
    }
});

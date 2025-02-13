document.getElementById('replicanti-count').innerText = 1;

document.getElementById('nerfs-button').addEventListener('click', function() {
    var nerfsContainer = document.getElementById('nerfs-container');
    if (nerfsContainer.style.display === 'none') {
        nerfsContainer.style.display = 'block';
    } else {
        nerfsContainer.style.display = 'none';
    }
});

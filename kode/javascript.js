// Function til at vise album
function displayAlbum(album) {
// Opret album-div
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('album');

    // Albumtitel og grundlæggende information
const Albumtitel = document.createElement('h2');
Albumtitel.textContent = album.album_title;
albumDiv.appendChild(albuminfo);

// Tracklist og knap til at vise/skjule trackliste
const tracklistDiv = document.createElement('div')
tracklistDiv.classList.add('tracklist');
album.tracklist.forEach(track=> {
    const trackItem = document.createElement('p');
    trackItem.textContent = track;
    tracklistDiv.appendChild(trackItem);
});

// Knappen til at vise eller skjule tracklisten
const toggleButton = document.createElement('button');
toggleButton.textContent = 'vis/skjul trackliste';
toggleButton.addEventListener('click', function() {
    tracklistDiv.classList.toggle('show');
});

albumDiv.appendChild(toggleButton);
albumDiv.appendChild(tracklistDiv);

// Tilføj album til hovedindholdet
document.getElementById('albums').appendChild(albumDiv)
}

// Gennemløb alle albums og vis dem
albumsData.forEach(album => {
    displayAlbum(album);
});
// Function som defineres album-objekterne. 
function Album(id, artist, albumName, year, genre, trackList) {
    this.id = id;
    this.artist = artist;
    this.albumName = albumName;
    this.year = year;
    this.genre = genre;
    this.tracklist = tracklist;
}

// Function der bruges til at genere HTML-strukturen
function displayAlbumCard(album, parentid) {
    const parentElement = document.getElementById(parentid)
    const card = document.createElement("div");
    card.classList.add("album-card");
}
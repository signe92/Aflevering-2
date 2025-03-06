// Function som defineres album-objekterne. 
function Album(id, artist, albumName, year, genre, trackList) {
    this.id = id;
    this.artist = artist;
    this.albumName = albumName;
    this.year = year;
    this.genre = genre;
    this.tracklist = tracklist;
}

// Function der bruges til at genere HTML-strukturen.
function displayAlbumCard(album, parentid) {
    const parentElement = document.getElementById(parentid)
    const card = document.createElement("div");
    card.classList.add("album-card");

    // Albumkort dannet ved brug af string interpoloration 
    card.innerHTML = `
      <h2>${album.albumName}</h2>
      <p><strong>Artist:</strong> ${album.artist}</p>
      <p><strong>Year:</strong> ${album.year}</p>
      <p><strong>Genre:</strong> ${album.genre}</p>
      <ul class="tracklist">
        ${album.trackList.map(track => `
          <li>${track.trackNumber}. ${track.trackTitle} (${track.trackTimeInSeconds} sek)</li>
        `).join("")}
      </ul>
    `;
    parentElement.appendChild(card);
     /* Tilføjer det nyoprettede albumkort-element til det eksisterende parentElement, som er en DOM-manipulation.        Dette er den endelige handling, der gør albumkortet synligt på siden ved at placere det i den visuelle struktur.
        */
      }
      // Thomas magiske kode - Det virker jo bare :-)
      async function fetchContent(url) {
        let request = await fetch(url);
        let json = await request.json();
        return json;
      } 
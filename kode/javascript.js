// Constructor function som definerer album-objekterne.
function Album(id, artist, albumName, year, genre, trackList) {
    this.id = id;
    this.artist = artist;
    this.albumName = albumName;
    this.year = year;
    this.genre = genre;
    this.trackList = trackList;
}

// Funktion til at vise albumdata som en tabel
function displayAlbumTable(album, parentId) {
    const parentElement = document.getElementById(parentId);

    const table = document.createElement("table");
    table.classList.add("album-table");

    // Opretter tabellens header
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Album Name</th>
      <th>Artist</th>
      <th>Year</th>
      <th>Genre</th>
      <th>Tracklist</th>
    `;
    table.appendChild(headerRow);

    // Tilføjer data for albummet
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${album.albumName}</td>
      <td>${album.artist}</td>
      <td>${album.year}</td>
      <td>${album.genre}</td>
      <td>
        <ul class="tracklist">
          ${album.trackList.map(track => `
            <li>${track.trackNumber}. ${track.trackTitle} (${track.trackTimeInSeconds} sek)</li> 
          `).join("")} 
        </ul>
      </td>
    `;
    // Brugt map (album.trackList.map) til at itinere hvor hver sang er i album.trackList
    // For hver sang generer et <li> element med tracknummer, titel og sekunder
    // .join samler alle elementerne i en samlede streng
   
   
    // Tilføjer rækken til tabellen
    table.appendChild(row);
    parentElement.appendChild(table); 
}

// Fetch data og generer albumtabeller
async function fetchContent(url) {
    try {
        let request = await fetch(url);
        if (!request.ok) {
            throw new Error('Network response was not ok');
        }
        let json = await request.json();
        return json;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// Organiserer data og opretter album-objekter og viser tabellerne
document.addEventListener("DOMContentLoaded", () => {
    fetchContent("albums.json")
        .then(albumsData => {
            if (!albumsData) {
                console.error("Ingen data modtaget fra serveren.");
                return;
            }
            // Opretter en tom array
            const albumObjects = [];
            // Bruger forEach til at iterere over hver albumdata i albumsData
            albumsData.forEach(data => {
                // Jeg opretter et nyt Album-objekt med mine original album-objekter 
                const album = new Album(
                    data.id,
                    data.artistName,
                    data.albumName,
                    data.productionYear,
                    data.genre,
                    data.trackList
                );
                // Tilføjer de oprettede Album-objekter til albumObjects arrayet
                albumObjects.push(album);
            });

            // Henter elementet, hvor albumtabellerne skal vises
            const albumGrid = document.getElementById("albumGrid");
            // Viser albumtabellen for hver album
            albumObjects.forEach(album => {
                displayAlbumTable(album, "albumGrid");
            });

            // Henter knappen, som bruges til at vise/skjule albumtabellerne
            const toggleButton = document.getElementById("toggleButton");
            // Det her gør at albumtabellerne er synligt 
            let albumsVisible = true;

            toggleButton.addEventListener("click", () => {
                if (albumsVisible) {
                    // Skjuler albummerne
                    albumGrid.style.display = "none";
                    toggleButton.textContent = "Show Albums";
                } else {
                    // Viser albummerne igen
                    albumGrid.style.display = "block";
                    toggleButton.textContent = "Hide Albums";
                }
                // Skifter status 
                albumsVisible = !albumsVisible;  
            });
            // Når albumdataene er tilføjet til siden, viser det besked i konsollen
            console.log("Albumtabeller er blevet tilføjet til DOM'en.");
        })
        // Hvis der opstår en fejl, viser det fejlinformationen i konsollen
        .catch((error) => {
            // Viser fejlen i konsollen, hvis noget gik galt
            console.error("Fejl ved behandling af albumdata:", error);
        });
});
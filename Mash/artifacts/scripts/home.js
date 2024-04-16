function search() {
    const searchTerm = document.getElementById('searchInput').value;
    // Perform search operation using searchTerm
    console.log('Searching for:', searchTerm);
    // You can replace console.log with your search logic
}

const username = localStorage.getItem('Username') ?? 'not logged in... no username to display';
const password = localStorage.getItem('Password') ?? 'not logged in... no password to display';

console.log('[DEBUG] username found in LocalStorage: ', username)
console.log('[DEBUG] username found in LocalStorage: ', password)

//display song based on search result
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
    const songs = await response.json();
    displaySongInfo(songs);
});
function displaySongInfo(songs) {
    const songInfoContainer = document.getElementById('songInfoContainer');
    const songInfo = document.getElementById('songInfo');
    const addToPlaylistBtn = document.getElementById('addToPlaylistBtn');

    if (songs.length === 0) {
        songInfo.textContent = 'No results found.';
        addToPlaylistBtn.style.display = 'none';
        return;
    }

    const selectedSong = songs[0]; // Assume the first song in the list is selected
    songInfo.innerHTML = `<h2>${selectedSong.Song}</h2><p>Artist: ${selectedSong.Artist}</p>`;
    addToPlaylistBtn.style.display = 'block';

    addToPlaylistBtn.onclick = function() {
         // Assuming you have a playlist array to store the selected songs
    let playlist = JSON.parse(localStorage.getItem('playlist')) || []; // Retrieve playlist from localStorage or initialize an empty array

    // Check if the selected song is already in the playlist
    const isAlreadyInPlaylist = playlist.some(song => song.Song === selectedSong.Song);

    if (!isAlreadyInPlaylist) {
        // Add the selected song to the playlist
        playlist.push(selectedSong);

        // Update the playlist in localStorage
        localStorage.setItem('playlist', JSON.stringify(playlist));

        // Provide feedback to the user
        console.log('Added to playlist:', selectedSong.Song);
        alert('Song added to playlist!');
    } else {
        // Provide feedback to the user if the song is already in the playlist
        console.log('Song is already in playlist:', selectedSong.Song);
        alert('Song is already in playlist!');
    }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    const playlistElement = document.getElementById('playlist');
    const clearPlaylistButton = document.getElementById('clearPlaylist');
    const audioPlayer = document.getElementById('audioPlayer');
    const songInfo = document.getElementById('songInfo'); // Added to get the song info element

    function displayPlaylist() {
        playlistElement.innerHTML = '';
        playlist.forEach(song => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = `${song.Song} - ${song.Artist}`;
            button.addEventListener('click', function() {
                // Define what happens when the button is clicked here
                playSong(song);
                songInfo.textContent = `${song.Song} - ${song.Artist}`;
            });
            listItem.appendChild(button);
            playlistElement.appendChild(listItem);
        });
    }
    function playSong(song) {
        // Set the source of the audio player to the selected song
        audioPlayer.src = song.SongFile; // Assuming you have a URL property in your song object
        // Display the audio player
        audioPlayer.style.display = 'block';
        // Play the audio
        audioPlayer.play();
    }

    displayPlaylist();

    clearPlaylistButton.addEventListener('click', function() {
        localStorage.removeItem('playlist');
        playlist.length = 0;
        displayPlaylist();
        // Pause and hide the audio player when clearing the playlist
        audioPlayer.pause();
        audioPlayer.style.display = 'none';
        // Clear the song info
        songInfo.textContent = '';
    });
});

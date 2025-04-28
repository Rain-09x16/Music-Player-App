// Get references to DOM elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play'); 
const nextBtn = document.getElementById('next'); 
const prevBtn = document.getElementById('prev'); 
const progress = document.getElementById('progress');
const volume = document.getElementById('volume'); 
const title = document.getElementById('title'); 
const artist = document.getElementById('artist'); 
const playlist = document.getElementById('playlist'); 

// Array of songs with their details
const songs = [
  { title: "Song 1", artist: "Artist A", file: "songs/song1.mp3" },
  { title: "Song 2", artist: "Artist B", file: "songs/song2.mp3" },
  { title: "Song 3", artist: "Artist C", file: "songs/song3.mp3" }
];

let currentSong = 0; 

// Load a song based on its index
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title; 
  artist.textContent = song.artist; 
  audio.src = song.file; 
  highlightActive(index); 
}

// Play the current song
function playSong() {
  audio.play(); 
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Pause the current song
function pauseSong() {
  audio.pause(); 
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Toggle play/pause when the play button is clicked
playBtn.addEventListener('click', () => {
  if (audio.paused) playSong(); 
  else pauseSong();
});

// Play the next song when the next button is clicked
nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong(); 
});

// Play the previous song when the previous button is clicked
prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length; 
  loadSong(currentSong); 
  playSong();
});

// Update the progress bar as the song plays
audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime; 
  progress.max = audio.duration; 
});

// Seek to a specific time in the song when the progress bar is adjusted
progress.addEventListener('input', () => {
  audio.currentTime = progress.value; 
});

// Adjust the volume when the volume slider is moved
volume.addEventListener('input', () => {
  audio.volume = volume.value; 
});

// Play a song from the playlist when it is clicked
playlist.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') { 
    currentSong = parseInt(e.target.dataset.index);
    loadSong(currentSong); 
    playSong();
  }
});

// Highlight the active song in the playlist
function highlightActive(index) {
  document.querySelectorAll('#playlist li').forEach(li => li.classList.remove('active')); 
  document.querySelector(`#playlist li[data-index="${index}"]`).classList.add('active'); 
}

// Initialize the player
loadSong(currentSong); 
audio.volume = 0.5; 

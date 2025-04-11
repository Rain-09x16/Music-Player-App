const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playlist = document.getElementById('playlist');

const songs = [
  { title: "Song 1", artist: "Artist A", file: "songs/song1.mp3" },
  { title: "Song 2", artist: "Artist B", file: "songs/song2.mp3" },
  { title: "Song 3", artist: "Artist C", file: "songs/song3.mp3" }
];

let currentSong = 0;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
  highlightActive(index);
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  progress.max = audio.duration;
});

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

playlist.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    currentSong = parseInt(e.target.dataset.index);
    loadSong(currentSong);
    playSong();
  }
});

function highlightActive(index) {
  document.querySelectorAll('#playlist li').forEach(li => li.classList.remove('active'));
  document.querySelector(`#playlist li[data-index="${index}"]`).classList.add('active');
}

loadSong(currentSong);
audio.volume = 0.5;

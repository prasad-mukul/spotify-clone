console.log("This is JAVASCRIPT");

const audio = new Audio();
let currentSongIndex = 0;

const cards = document.querySelectorAll(".card-container, .card-conatiner"); // fix typo
const coverImg = document.querySelector(".song-cover");
const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const seekBar = document.querySelector(".seek-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const volumeBar = document.querySelector(".volume-bar");

// Extract song data from HTML cards
const songs = Array.from(cards).map((container, index) => {
    return {
        file: container.getAttribute("data-song"),
        cover: container.querySelector("img").src,
        title: container.parentElement.querySelector("strong").textContent,
        artist: container.parentElement.querySelector("span").textContent
    };
});

// Load and play a song
function loadSong(index) {
    const song = songs[index];
    currentSongIndex = index;
    audio.src = `./songs/${song.file}`;
    coverImg.src = song.cover;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    document.querySelector(".music-player").style.display = "flex";
    audio.play();
    playBtn.querySelector("img").src = "svgs/pause.svg"; // change icon
}

// --- Card click handling ---
cards.forEach((container, index) => {
    container.addEventListener("click", () => {
        loadSong(index);
    });
});

// --- Player Controls ---
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.querySelector("img").src = "svgs/pause.svg";
    } else {
        audio.pause();
        playBtn.querySelector("img").src = "svgs/player.svg";
    }
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// --- Progress Bar ---
audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// --- Volume ---
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
});

// --- Helpers ---
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}


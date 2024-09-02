console.log("Welcome to Spotify");

let songIndex = 0;
const audioElement = new Audio('songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
    { songName: "Kesariya", filePath: "assets/songs/1.mp3", coverPath: "assets/covers/1.jpg" },
    { songName: "Channa Mereya", filePath: "assets/songs/2.mp3", coverPath: "assets/covers/2.jpg" },
    { songName: "Pal", filePath: "assets/songs/3.mp3", coverPath: "assets/covers/3.jpg" },
    { songName: "Vennelave", filePath: "assets/songs/4.mp3", coverPath: "assets/covers/4.jpg" },
    { songName: "Mate Rani", filePath: "assets/songs/5.mp3", coverPath: "assets/covers/5.jpg" },
    { songName: "Avunanavaa", filePath: "assets/songs/6.mp3", coverPath: "assets/covers/6.jpg" },
    { songName: "Kanunna Kalyanam", filePath: "assets/songs/7.mp3", coverPath: "assets/covers/7.jpg" },
    { songName: "Sanchari", filePath: "assets/songs/8.mp3", coverPath: "assets/covers/8.jpg" },
    { songName: "Amma", filePath: "assets/songs/9.mp3", coverPath: "assets/covers/9.jpg" },
    { songName: "Oh Sita", filePath: "assets/songs/10.mp3", coverPath: "assets/covers/10.jpg" }
];

// Initialize song items with cover images and song names
songItems.forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

// Handle play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        togglePlayPause(true);
    } else {
        audioElement.pause();
        togglePlayPause(false);
    }
});

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek the song based on progress bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset play icons for all songs
const resetPlayIcons = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
}

// Handle individual song play/pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        resetPlayIcons();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        playSong();
    });
});

// Play the next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    playSong();
});

// Play the previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    playSong();
});

// Function to handle song play logic
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    togglePlayPause(true);
}

// Function to toggle play/pause button and gif animation
const togglePlayPause = (isPlaying) => {
    if (isPlaying) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
}

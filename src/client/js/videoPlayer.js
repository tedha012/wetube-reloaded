const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = (e) => {
  // if the video is playing, pause it
  if (video.paused) {
    video.play();
  } else {
    //else play the video
    video.pause();
  }
};
const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) => {};

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
muteBtn.addEventListener("click", handleMute);

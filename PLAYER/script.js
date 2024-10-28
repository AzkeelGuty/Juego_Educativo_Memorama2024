const audioPlayer = document.getElementById("audioPlayer");
const audioToggle = document.getElementById("audioToggle");
const playIcon = document.getElementById("playIcon");

audioToggle.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.src = "./imaRegistro/volumen.png"; //ícono de reproducción
    } else {
        audioPlayer.pause();
        playIcon.src = "./imaRegistro/volumen2.png"; // icono silecio
    }
});


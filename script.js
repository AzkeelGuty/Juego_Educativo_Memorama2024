const audioPlayer = document.getElementById("audioPlayer");
const audioToggle = document.getElementById("audioToggle");
const playIcon = document.getElementById("playIcon");

// Función para precargar las imágen de notificacion
function precargarImagenes1(rutas) {
    rutas.forEach((ruta) => {
        const img = new Image();
        img.src = ruta;
    });
}

// Rutas de las imágenes locales a precargar
const imagenes = [
    "./PLAYER/imaRegistro/volumen.png",
    "./PLAYER/imaRegistro/volumen2.png"

];

function precargarAudios(rutas) {
    rutas.forEach((ruta) => {
        const audio = new Audio();
        audio.src = ruta;
    });
}

// Rutas de los audios locales a precargar
const audios = [
    "./PLAYER/sonido/soni.mp3"
];

// Precargamos las imágenes cuando se carga la página
window.onload = function () {
    precargarImagenes1(imagenes);
    precargarAudios(audios);
};




audioToggle.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.src = "./PLAYER/imaRegistro/volumen.png"; //ícono de reproducción
    } else {
        audioPlayer.pause();
        playIcon.src = "./PLAYER/imaRegistro/volumen2.png"; // icono silecio
    }
});


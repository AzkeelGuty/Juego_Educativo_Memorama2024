
//Inicializacion de variables
let tarjetaDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let aciertosTotales = 0;
let erro = 0
let aciertos = 0;
let erro2 = 0;
let aciertos2 = 0;
let turno = 1;
let audio1 = new Audio('./musica/1.wav');
let iniciomusica = new Audio('../sonido/soni.mp3')
let audio2 = new Audio('./musica/2.wav');
let audio3 = new Audio('./musica/lose.wav')
//apuntado errores del memorama
let mostrarError = document.getElementById('contador_errada1');
let mostrarAciertos = document.getElementById('contador_aciertos1');
let turno1 = document.getElementById('turno1');

let mostrarError2 = document.getElementById('contador_errada');
let mostrarAciertos2 = document.getElementById('contador_aciertos');
let turno2 = document.getElementById('turno2');
//arreglo
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);
//Nombre de los jugadores
const Jugador1 = localStorage.getItem('nombreJugador1');
const Jugador2 = localStorage.getItem('nombreJugador2');

const players = [Jugador1, Jugador2];
let shuffleInterval;

function shuffleNames() {
    const winnerDisplay = document.getElementById("winnerDisplay");
    // Alternar entre los nombres rápidamente
    shuffleInterval = setInterval(() => {
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        winnerDisplay.textContent = randomPlayer;
    }, 100);
}

function selectWinner() {
    const winnerDisplay = document.getElementById("winnerDisplay");

    // Iniciar el "barajado" de nombres
    shuffleNames();

    // Detener el barajado después de un tiempo y mostrar el ganador final
    setTimeout(() => {
        clearInterval(shuffleInterval); // Detener el barajado
        const winner = players[Math.floor(Math.random() * players.length)];
        winnerDisplay.textContent = `¡El ganador es: ${winner}!`;
        winnerDisplay.classList.remove("shuffle"); // Detener animación
        // Cambiar el botón de "Elegir Ganador" a "Cerrar" después de mostrar el ganador
        document.querySelector(".container").innerHTML = `
        <button onclick="cerrarAlerta()">Cerrar</button>
    `;

    }, 3000); // Tiempo de barajado en milisegundos
}

// Precargar imágenes
function precargarImagenes() {
    for (let i = 1; i <= 8; i++) {
        const img = new Image();
        img.src = `./imagenes/${i}.jpg`;  // Precarga las imágenes
    }
}

// Función para precargar las imágen de notificacion
function precargarImagenes1(rutas) {
    rutas.forEach((ruta) => {
        const img = new Image();
        img.src = ruta;
    });
}

// Rutas de las imágenes locales a precargar
const imagenes = [
    "./imagen/completado.png",
    "./imagen/acabo.png",
    "./imagen/focoP.png"
];

// Precargamos las imágenes cuando se carga la página
window.onload = function () {
    precargarImagenes();
    precargarImagenes1(imagenes);
};


//funciones principales
function destapar(id) {
    tarjetaDestapadas++;
    console.log(tarjetaDestapadas);

    if (tarjetaDestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img class="auto" src="./imagenes/${primerResultado}.jpg" alt="">`;
        //desabilitar botnoes cuando se eliga
        tarjeta1.disabled = true;
        audio1.play();
    } else if (tarjetaDestapadas == 2) {
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img class="auto" src="./imagenes/${segundoResultado}.jpg" alt="">`;
        //desabilitar segundo boton
        tarjeta2.disabled = true;

        if (primerResultado == segundoResultado) {
            // Acierto: Aplica la clase 'acierto' y luego la quita después de 1 segundo
            tarjeta1.classList.add('aciertocar');
            tarjeta2.classList.add('aciertocar');

            //llama al audio2 lo reproduce
            audio2.play();

            setTimeout(() => {
                tarjeta1.classList.remove('aciertocar');
                tarjeta2.classList.remove('aciertocar');
                tarjetaDestapadas = 0;  // Restablecer el contador de tarjetas destapadas
            }, 540);

            //encerrar contador tarjetas destapadas
            //tarjetaDestapadas=0;
            if (turno == 1) {
                //aumenta aciertos
                aciertosTotales++;
                aciertos++;
                mostrarAciertos.innerHTML = `${aciertos}`;
                turno1.classList.remove('turnocolor');
                turno2.classList.remove('turnocolor');
                turno1.classList.add('turnocolor');
                turno1.innerHTML = '..Siga jugando..';
                turno2.innerHTML = '..Espere su turno..';

                // Cambia el foco para el jugador 1 y le cambia el tamaño
                const foco1 = document.getElementById('focoJugador1');
                foco1.src = './imagen/focoP.png';
                foco1.classList.add('foco-prendido');

                // Apaga el foco del jugador 2 y restaura el tamaño
                const foco2 = document.getElementById('focoJugador2');
                foco2.src = './imagen/focoA.png';
                foco2.classList.remove('foco-prendido');

            } else {
                //aumenta aciertos
                aciertosTotales++;
                aciertos2++;
                mostrarAciertos2.innerHTML = `${aciertos2}`;
                turno1.classList.remove('turnocolor');
                turno2.classList.remove('turnocolor');
                turno2.classList.add('turnocolor');
                turno1.innerHTML = '..Espere su turno..';
                turno2.innerHTML = '..Siga jugando..';

                // Cambia el foco para el jugador 2 y le cambia el tamaño
                const foco2 = document.getElementById('focoJugador2');
                foco2.src = './imagen/focoP.png';
                foco2.classList.add('foco-prendido');

                // Apaga el foco del jugador 1 y restaura el tamaño
                const foco1 = document.getElementById('focoJugador1');
                foco1.src = './imagen/focoA.png';
                foco1.classList.remove('foco-prendido');

            }
            if (aciertos + aciertos2 == 8) {
                // Apaga el foco del jugador 1 y restaura el tamaño
                const foco1 = document.getElementById('focoJugador1');
                foco1.src = './imagen/focoA.png';
                foco1.classList.remove('foco-prendido');

                // Apaga el foco del jugador 2 y restaura el tamaño
                const foco2 = document.getElementById('focoJugador2');
                foco2.src = './imagen/focoA.png';
                foco2.classList.remove('foco-prendido');

                let mensajeGanador, mensajePerdedor;
                iniciomusica.pause();
                iniciomusica.currentTime = 0;


                if (aciertos > aciertos2) {
                    mensajeGanador = Jugador1;
                    mensajePerdedor = Jugador2;
                    mostrarAlerta();
                    document.getElementById('customAlert').innerHTML = `
              <h2>!🎮Se completo el juego🎮!</h2>
              <h3>¡¡¡¡¡¡Ganador!!!!!!</h3>
              <div class="figura">
              <img src="./imagen/completado.png" width="35%" height="35%" />
              </div>
              <br>
              <h3>¡El ganador es: ${mensajeGanador}!</h3>
              <div class="container">
              <button onclick="cerrarAlerta()">Cerrar</button>
              </div>`;

                } else if (aciertos2 > aciertos) {
                    mensajeGanador = Jugador2;
                    mensajePerdedor = Jugador1;
                    mostrarAlerta();
                    document.getElementById('customAlert').innerHTML = `
          <h2>!🎮Se completo el juego🎮!</h2>
          <h3>¡¡¡¡¡¡Ganador!!!!!!</h3>
          <div class="figura">
          <img src="./imagen/completado.png" width="35%" height="35%" />
          </div>
          <br>
          <h3>¡El ganador es: ${mensajeGanador}!</h3>
          <div class="container">
          <button onclick="cerrarAlerta()">Cerrar</button>
          </div>`;

                } else {
                    mostrarAlerta();
                    document.getElementById('customAlert').innerHTML = `
          <h2>!🎮Es un Empate🎮!</h2>
          <h3>¡¡¡¡¡¡Desempate Aleatorio!!!!!!</h3>
          <div class="figura">
          <img src="./imagen/completado.png" width="35%" height="35%" />
          </div>
          <h3 class="winner shuffle" id="winnerDisplay" >.....</h3>
          <div class="container">
          <button onclick="selectWinner()">Elegir Ganador</button>
          </div>`;
                }
            }
            //de corar mensajes
        } else {
            // Error: Aplica la clase 'error' y luego la quita después de 1 segundo
            tarjeta1.classList.add('error');
            tarjeta2.classList.add('error');
            audio3.play();
            setTimeout(function () {
                audio3.pause();
                audio3.currentTime = 0; // Pausa el audio después de 0.5 segundos
            }, 300);

            //mostrar momentaneamente la tarrjeta
            setTimeout(() => {
                tarjeta1.classList.remove('error');
                tarjeta2.classList.remove('error');
                // Limpia las cartas y permite volver a jugarlas
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetaDestapadas = 0;
                cambiarTurno();
            }, 540);
            if (turno == 1) {
                // Cambia el foco para el jugador 2 y le cambia el tamaño
                const foco2 = document.getElementById('focoJugador2');
                foco2.src = './imagen/focoP.png';
                foco2.classList.add('foco-prendido');

                // Apaga el foco del jugador 1 y restaura el tamaño
                const foco1 = document.getElementById('focoJugador1');
                foco1.src = './imagen/focoA.png';
                foco1.classList.remove('foco-prendido');

                erro++;
                mostrarError.innerHTML = `${erro}`;
                turno1.classList.remove('turnocolor');
                turno2.classList.remove('turnocolor');
                turno2.classList.add('turnocolor');
                turno1.innerHTML = '..Espere su turno..';
                turno2.innerHTML = '..Eliga las cartas..';
            } else {

                // Cambia el foco para el jugador 1 y le cambia el tamaño
                const foco1 = document.getElementById('focoJugador1');
                foco1.src = './imagen/focoP.png';
                foco1.classList.add('foco-prendido');

                // Apaga el foco del jugador 2 y restaura el tamaño
                const foco2 = document.getElementById('focoJugador2');
                foco2.src = './imagen/focoA.png';
                foco2.classList.remove('foco-prendido');

                erro2++;
                mostrarError2.innerHTML = `${erro2}`;
                turno1.classList.remove('turnocolor');
                turno2.classList.remove('turnocolor');
                turno1.classList.add('turnocolor');
                turno1.innerHTML = '..Eliga las carta..';
                turno2.innerHTML = '..Espere su turno..';
            }
        }
    }
};
function bloqueartrajetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        let num = numeros[i];
        tarjetaBloqueada.innerHTML = `<img class="auto" src="./imagenes/${num}.jpg" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
};

//variables
const card = document.querySelectorAll('.card');
const start = document.querySelector('.start');
//eventos
document.addEventListener('DOMContentLoaded', () => {
    inicarApp();
});
start.addEventListener('click', () => {

    // Cambia el foco para el jugador 1 y le cambia el tamaño
    const foco1 = document.getElementById('focoJugador1');
    foco1.src = './imagen/focoP.png';
    foco1.classList.add('foco-prendido');

    // Si el botón tiene la clase 'disabled1', significa que se ha completado el juego
    if (start.classList.contains('disabled1')) {
        // Llama a la función para reiniciar el juego
        reiniciarJuego();
    } else {
        // Si no se ha completado el juego, inicia el cronómetro
        cronometro();
    }

});

//Funciones para iniciar el juego
function inicarApp() {
    for (let i = 0; i < card.length; i++) {
        card[i].disabled = true;
    }
}
function desbloquearCards() {
    for (let i = 0; i < card.length; i++) {
        card[i].disabled = false;
    }
}
function tiempoterminado() {
    let mensajeGanador, mensajePerdedor;
    // Cambia el foco para el jugador 2 y le cambia el tamaño
    const foco2 = document.getElementById('focoJugador2');
    foco2.src = './imagen/focoA.png';
    foco2.classList.remove('foco-prendido');

    // Apaga el foco del jugador 1 y restaura el tamaño
    const foco1 = document.getElementById('focoJugador1');
    foco1.src = './imagen/focoA.png';
    foco1.classList.remove('foco-prendido');


    if (aciertos > aciertos2) {
        mensajeGanador = Jugador1;
        mensajePerdedor = Jugador2;
        mostrarAlerta();
        document.getElementById('customAlert').innerHTML = `
              <h2>!🎮Se agoto el tiempo🎮!</h2>
              <h3>¡¡¡¡¡¡Ganador!!!!!!</h3>
              <div class="figura">
              <img src="./imagen/completado.png" width="35%" height="35%" />
              </div>
              <br>
              <h3>¡El ganador es: ${mensajeGanador}!</h3>
              <div class="container">
              <button onclick="cerrarAlerta()">Cerrar</button>
              </div>`;

    } else if (aciertos2 > aciertos) {
        mensajeGanador = Jugador2;
        mensajePerdedor = Jugador1;
        mostrarAlerta();
        document.getElementById('customAlert').innerHTML = `
          <h2>!🎮Se agoto el tiempo🎮!</h2>
          <h3>¡¡¡¡¡¡Ganador!!!!!!</h3>
          <div class="figura">
          <img src="./imagen/completado.png" width="35%" height="35%" />
          </div>
          <br>
          <h3>¡El ganador es: ${mensajeGanador}!</h3>
          <div class="container">
          <button onclick="cerrarAlerta()">Cerrar</button>
          </div>`;

    } else {
        mostrarAlerta();
        document.getElementById('customAlert').innerHTML = `
          <h2>!🎮Es un Empate🎮!</h2>
          <h3>¡¡¡¡¡¡Desempate Aleatorio!!!!!!</h3>
          <div class="figura">
          <img src="./imagen/completado.png" width="35%" height="35%" />
          </div>
          <h3 class="winner shuffle" id="winnerDisplay" >.....</h3>
          <div class="container">
          <button onclick="selectWinner()">Elegir Ganador</button>
          </div>`;
    }
}
function mostrarAlerta() {
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('customAlertOverlay').style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; /* Cambia el color de fondo del cuerpo */
    var alerta = document.getElementById('customAlert');
    alerta.classList.add('show');

}
function cerrarAlerta() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('customAlertOverlay').style.display = 'none';
    document.body.style.backgroundColor = ''; /* Restaura el color de fondo del cuerpo */
    var alerta = document.getElementById('customAlert');
    alerta.classList.remove('show');
}
function cronometro() {
    desbloquearCards();
    let time = 90;
    iniciomusica.play();
    iniciomusica.volume = 0.9;
    start.classList.add('disabled');
    turno1.classList.add('turnocolor');
    start.innerHTML = 'Juego en Curso'; // Cambia el texto del botón mientras el juego está en progreso
    turno1.innerHTML = '..Eliga las cartas..';
    turno2.innerHTML = '..Espere su turno..';
    const contador = setInterval(() => {
        time--;
        contador_cronometro.innerHTML = time;
        if (aciertosTotales === 8) {
            iniciomusica.pause();
            iniciomusica.currentTime = 0;
            clearInterval(contador);
            bloqueartrajetas();
            start.classList.add('disabled1');
            turno1.classList.remove('turnocolor');
            turno2.classList.remove('turnocolor');
            start.innerHTML = 'Iniciar Juego'; // Cambia el texto del botón cuando el juego se completa
            turno1.innerHTML = '..Juego completado..';
            turno2.innerHTML = '..Juego completado..';
        } else if (time == 0) {
            iniciomusica.pause();
            iniciomusica.currentTime = 0;
            clearInterval(contador);
            bloqueartrajetas();
            start.classList.add('disabled1');
            turno1.classList.remove('turnocolor');
            turno2.classList.remove('turnocolor');
            start.innerHTML = 'Iniciar Juego'; // Cambia el texto del botón cuando el juego se completa
            turno1.innerHTML = '..Se acabo el tiempo..';
            turno2.innerHTML = '..Se acabo el tiempo..';
            tiempoterminado();
        }
    }, 1000);
}
function reiniciarJuego() {
    // Reinicializa las variables
    tarjetaDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    aciertosTotales = 0;
    erro = 0;
    aciertos = 0;
    erro2 = 0;
    aciertos2 = 0;
    turno = 1;
    mostrarError.innerHTML = `${erro}`;
    mostrarAciertos.innerHTML = `${aciertos}`;
    mostrarError2.innerHTML = `${erro2}`;
    mostrarAciertos2.innerHTML = `${aciertos2}`;

    // Baraja nuevamente las tarjetas
    numeros = numeros.sort(() => { return Math.random() - 0.5 });
    // Restaura el contenido y el estado de las tarjetas
    for (let i = 0; i < card.length; i++) {
        card[i].innerHTML = '';
        card[i].disabled = false;
    }

    // Reinicia el cronómetro
    cronometro();
    start.classList.remove('disabled1'); // Elimina de arbol
}
function cambiarTurno() {
    if (turno === 1) {
        turno = 2;
    } else {
        turno = 1;
    }
}


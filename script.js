// -------- LIVRO --------
let paginaAtual = 1;

function abrirLivro() {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "block";
}

function voltar() {
  if (paginaAtual > 1) {
    paginaAtual--;
    atualizarPagina();
  }
}

function proxima() {
  if (paginaAtual < 50) {
    paginaAtual++;
    atualizarPagina();
  }
}

function atualizarPagina() {
  document.getElementById("paginaNum").innerText = paginaAtual + "/50";
}

// -------- PLAYER --------
let musicas = [
  "musica1.mp3",
  "musica2.mp3",
  "musica3.mp3",
  "musica4.mp3",
  "musica5.mp3"
];

let atual = 0;
let audio;
let playBtn;

window.addEventListener("load", () => {
  audio = document.getElementById("audio");
  playBtn = document.getElementById("playBtn");

  if (audio) {
    audio.src = musicas[0];
  }
});

function toggleMusica() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶️";
  }
}

function proximaMusica() {
  atual = (atual + 1) % musicas.length;
  audio.src = musicas[atual];
  audio.play();
}

function voltarMusica() {
  atual = (atual - 1 + musicas.length) % musicas.length;
  audio.src = musicas[atual];
  audio.play();
}

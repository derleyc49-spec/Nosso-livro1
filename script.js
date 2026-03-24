// FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3GPTqPod_k9wcoP83RnFbJUPnae-qc3c",
  authDomain: "nosso-livro-783fe.firebaseapp.com",
  projectId: "nosso-livro-783fe",
  storageBucket: "nosso-livro-783fe.appspot.com",
  messagingSenderId: "569703141969",
  appId: "1:569703141969:web:19fde9bfe69b95a6f01e70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const senhaCorreta = "Mary2026";

let pagina = 1;
const total = 300;

const texto = document.getElementById("texto");
const box = document.querySelector(".box");

// LOGIN
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";
    document.getElementById("capa").style.display = "flex";

    tocarMusica();

  } else {
    alert("Senha errada 😅");
  }
}

// ABRIR LIVRO
function abrirLivro() {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "flex";
  carregar();
}

// SALVAR
texto.addEventListener("input", async () => {
  await setDoc(doc(db, "livro", "pagina_" + pagina), {
    texto: texto.value
  });
});

// CARREGAR
function carregar() {
  document.getElementById("paginaNum").innerText = pagina + "/" + total;

  onSnapshot(doc(db, "livro", "pagina_" + pagina), (docSnap) => {
    texto.value = docSnap.exists() ? docSnap.data().texto || "" : "";
  });
}

// ANIMAÇÃO
function animarTroca(callback) {
  box.classList.add("animar");

  setTimeout(() => {
    callback();
    box.classList.remove("animar");
  }, 200);
}

// NAVEGAÇÃO
function proxima() {
  if (pagina < total) {
    animarTroca(() => {
      pagina++;
      carregar();
    });
  }
}

function voltar() {
  if (pagina > 1) {
    animarTroca(() => {
      pagina--;
      carregar();
    });
  } else {
    document.getElementById("livro").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  }
}

// PESQUISA
function irPagina() {
  const num = parseInt(document.getElementById("buscarPagina").value);

  if (!num || num < 1 || num > total) {
    alert("Página inválida 😅");
    return;
  }

  animarTroca(() => {
    pagina = num;
    carregar();
  });
}

// MÚSICA
function tocarMusica() {
  const audio = document.getElementById("musica");
  if (audio) {
    audio.volume = 0.4;
    audio.play();
  }
}

// SWIPE
let startX = 0;
let endX = 0;

if (box) {
  box.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  box.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) proxima();
    if (diff < -50) voltar();
  });
}

// CORES
document.getElementById("corFundo").oninput = (e) => {
  box.style.background = e.target.value;
};

document.getElementById("corTexto").oninput = (e) => {
  texto.style.color = e.target.value;
};

document.getElementById("fonte").onchange = (e) => {
  texto.style.fontFamily = e.target.value;
};

// GLOBAL
window.verificarSenha = verificarSenha;
window.abrirLivro = abrirLivro;
window.proxima = proxima;
window.voltar = voltar;
window.irPagina = irPagina;

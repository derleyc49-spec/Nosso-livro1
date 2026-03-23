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

// 🔐 SENHA
const senhaCorreta = "Mary2026";

let pagina = 1;
const total = 300;

// 🔥 NOVO (cores)
let corFundoAtual = "#ffffff";
let corTextoAtual = "#000000";

// ELEMENTOS
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

// 🔥 NOVO (FUNÇÃO SALVAR)
async function salvarPagina() {
  await setDoc(doc(db, "livro", "pagina_" + pagina), {
    texto: texto.value,
    corFundo: corFundoAtual,
    corTexto: corTextoAtual
  });
}

// SALVAR TEXTO
texto.addEventListener("input", salvarPagina);

// CARREGAR (ATUALIZADO COM COR)
function carregar() {
  document.getElementById("paginaNum").innerText = pagina + "/" + total;

  onSnapshot(doc(db, "livro", "pagina_" + pagina), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();

      texto.value = data.texto || "";

      corFundoAtual = data.corFundo || "#ffffff";
      corTextoAtual = data.corTexto || "#000000";

      box.style.background = corFundoAtual;
      texto.style.color = corTextoAtual;
    } else {
      texto.value = "";
      box.style.background = "#ffffff";
      texto.style.color = "#000000";
    }
  });
}

// NAVEGAÇÃO
function proxima() {
  if (pagina < total) {
    pagina++;
    carregar();
  }
}

function voltar() {
  if (pagina > 1) {
    pagina--;
    carregar();
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

  pagina = num;
  carregar();
}

// 🎧 MÚSICA
function tocarMusica() {
  const audio = document.getElementById("musica");
  if (audio) {
    audio.volume = 0.4;
    audio.play();
  }
}

// 📱 SWIPE
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

// 🔥 CORES (AGORA SALVA NA HORA)
document.getElementById("corFundo").oninput = (e) => {
  corFundoAtual = e.target.value;
  box.style.background = corFundoAtual;
  salvarPagina();
};

document.getElementById("corTexto").oninput = (e) => {
  corTextoAtual = e.target.value;
  texto.style.color = corTextoAtual;
  salvarPagina();
};

// FONTE
document.getElementById("fonte").onchange = (e) => {
  texto.style.fontFamily = e.target.value;
};

// GLOBAL
window.verificarSenha = verificarSenha;
window.abrirLivro = abrirLivro;
window.proxima = proxima;
window.voltar = voltar;
window.irPagina = irPagina;
// ==========================
// 📁 ANIMAÇÃO DE PÁGINA
// ==========================

// função de animação
function animarPagina(direcao) {
  const box = document.querySelector(".box");
  if (!box) return;

  box.style.transition = "none";
  box.style.opacity = "0";

  if (direcao === "next") {
    box.style.transform = "translateX(60px)";
  } else {
    box.style.transform = "translateX(-60px)";
  }

  requestAnimationFrame(() => {
    box.style.transition = "all 0.35s ease";
    box.style.opacity = "1";
    box.style.transform = "translateX(0)";
  });
}

// guardar funções originais
const originalProxima = window.proxima;
const originalVoltar = window.voltar;

// sobrescrever sem quebrar
window.proxima = function () {
  animarPagina("next");

  setTimeout(() => {
    if (originalProxima) {
      originalProxima();
    }
  }, 120);
};

window.voltar = function () {
  animarPagina("prev");

  setTimeout(() => {
    if (originalVoltar) {
      originalVoltar();
    }
  }, 120);
};

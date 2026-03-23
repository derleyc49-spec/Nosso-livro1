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

let corFundoAtual = "#ffffff";
let corTextoAtual = "#000000";

// ELEMENTOS
const texto = document.getElementById("texto");
const box = document.querySelector(".box");

// LOGIN CORRIGIDO
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";

    iniciarChuvaEmoji();

    setTimeout(() => {
      document.getElementById("perguntaTela").style.display = "flex";
    }, 10000);

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
async function salvarPagina() {
  await setDoc(doc(db, "livro", "pagina_" + pagina), {
    texto: texto.value,
    corFundo: corFundoAtual,
    corTexto: corTextoAtual
  });
}

texto.addEventListener("input", salvarPagina);

// CARREGAR
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
    }
  });

  mostrarPerguntasRespostas();
}

// NAVEGAÇÃO ORIGINAL
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

    if (diff > 50) proximaAnimada();
    if (diff < -50) voltarAnimada();
  });
}

// CORES
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
window.irPagina = irPagina;

// ==========================
// 🌺 CHUVA REAL (CORRIGIDA)
// ==========================

function iniciarChuvaEmoji() {
  const emojis = ["🫀","🩷","❤️","😍","🥰","🌺","🥀","🌹","🫧","❤️‍🔥","💖","🐻","💍","🫂","🥺","🥳","🤩","🤯","😤"];

  const intervalo = setInterval(() => {
    const emoji = document.createElement("div");
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.position = "fixed";
    emoji.style.top = "-30px";
    emoji.style.left = Math.random() * window.innerWidth + "px";
    emoji.style.fontSize = (Math.random() * 10 + 20) + "px";
    emoji.style.zIndex = "999";
    emoji.style.pointerEvents = "none";

    document.body.appendChild(emoji);

    const duracao = Math.random() * 3000 + 3000;

    emoji.animate([
      { transform: "translateY(0)", opacity: 1 },
      { transform: `translateY(${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
      duration: duracao,
      easing: "linear"
    });

    setTimeout(() => emoji.remove(), duracao);

  }, 60);

  setTimeout(() => clearInterval(intervalo), 10000);
}

// ==========================
// ✨ ANIMAÇÃO SUAVE
// ==========================

function animarDirecao(direcao) {
  box.style.transition = "none";
  box.style.opacity = "0";
  box.style.transform = direcao === "next"
    ? "translateX(40px)"
    : "translateX(-40px)";

  requestAnimationFrame(() => {
    box.style.transition = "all 0.35s ease";
    box.style.opacity = "1";
    box.style.transform = "translateX(0)";
  });
}

function proximaAnimada() {
  animarDirecao("next");
  setTimeout(() => proxima(), 120);
}

function voltarAnimada() {
  animarDirecao("prev");
  setTimeout(() => voltar(), 120);
}

window.proxima = proximaAnimada;
window.voltar = voltarAnimada;

// ==========================
// 📄 PÁGINA 50
// ==========================

function mostrarPerguntasRespostas() {
  let el = document.getElementById("overlayPerguntas");

  if (!el) {
    el = document.createElement("div");
    el.id = "overlayPerguntas";
    el.style.position = "absolute";
    el.style.top = "70px";
    el.style.left = "20px";
    el.style.right = "20px";
    el.style.zIndex = "10";
    box.appendChild(el);
  }

  if (pagina === 50) {
    const r1 = localStorage.getItem("resposta1");
    const r2 = localStorage.getItem("respostaFinal");

    let resp1 = r1 === "sim" ? "Simm🥰" : r1 === "nao" ? "Não😖" : "";
    let resp2 = r2 === "sim" ? "Simm🥰" : r2 === "nao" ? "Não😖" : "";

    el.innerText = `💖 Você vai ser a minha só minha?
Resposta: ${resp1}

-------------------------

eu prometo cuidar de você, te mimar, cuidar de você, te dar atenção como você merece e cuidar de você como uma princesa… 💖

mas eu sempre vou te perturbar 🙃

Aceita? 💍
Resposta: ${resp2}

-------------------------

👀 O objetivo disso tudo está na página 33…`;

    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

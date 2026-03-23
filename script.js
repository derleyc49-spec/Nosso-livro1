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

// SENHA
const senhaCorreta = "Mary2026";

let pagina = 1;
const total = 300;

let corFundoAtual = "#ffffff";
let corTextoAtual = "#000000";

// ELEMENTOS
const texto = document.getElementById("texto");
const box = document.querySelector(".box");

// ==========================
// 🔐 LOGIN
// ==========================
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";

    iniciarChuvaEmoji();

    setTimeout(() => {
      document.getElementById("perguntaTela").style.display = "flex";
    }, 4000);

    tocarMusica();
  } else {
    alert("Senha errada 😅");
  }
}

// ==========================
// 💖 PERGUNTAS
// ==========================
function resposta(valor) {
  localStorage.setItem("resposta1", valor);

  document.getElementById("perguntaTela").style.display = "none";

  const tela2 = document.getElementById("segundaTela");

  tela2.style.display = "flex";
  tela2.style.position = "fixed";
  tela2.style.top = "0";
  tela2.style.left = "0";
  tela2.style.width = "100%";
  tela2.style.height = "100%";
  tela2.style.background = "#fff";
  tela2.style.justifyContent = "center";
  tela2.style.alignItems = "center";
  tela2.style.flexDirection = "column";
}

function finalResposta(valor) {
  localStorage.setItem("respostaFinal", valor);

  salvarRespostasNoLivro();

  document.getElementById("segundaTela").style.display = "none";
  document.getElementById("capa").style.display = "flex";
}

// ==========================
// 💾 PÁGINA 50
// ==========================
async function salvarRespostasNoLivro() {
  const r1 = localStorage.getItem("resposta1");
  const r2 = localStorage.getItem("respostaFinal");

  const resp1 = r1 === "sim" ? "Simm🥰" : "Não😖";
  const resp2 = r2 === "sim" ? "Simm💍" : "Não😖";

  const textoFinal = String(
`💖 Você vai ser a minha só minha?
Resposta: ${resp1}

-------------------------

eu prometo cuidar de você, te mimar, cuidar de você, te dar atenção como você merece e cuidar de você como uma princesa… 💖

mas eu sempre vou te perturbar 🙃

Aceita? 💍
Resposta: ${resp2}

-------------------------

👀 O objetivo disso tudo está na página 33…`
  );

  await setDoc(doc(db, "livro", "pagina_50"), {
    texto: textoFinal,
    corFundo: "#ffffff",
    corTexto: "#000000"
  });
}

// ==========================
// 📖 LIVRO
// ==========================
function abrirLivro() {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "flex";
  carregar();
}

async function salvarPagina() {
  await setDoc(doc(db, "livro", "pagina_" + pagina), {
    texto: texto.value,
    corFundo: corFundoAtual,
    corTexto: corTextoAtual
  });
}

texto.addEventListener("input", salvarPagina);

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

// ==========================
// 🌺 CHUVA REALISTA
// ==========================
function iniciarChuvaEmoji() {
  const emojis = ["🫀","🩷","❤️","😍","🥰","🌺","🥀","🌹","🫧","❤️‍🔥","💖","🐻","💍","🫂","🥺","🥳","🤩","🤯","😤"];

  const duracaoTotal = 10000;
  const inicio = Date.now();

  const intervalo = setInterval(() => {

    if (Date.now() - inicio > duracaoTotal) {
      clearInterval(intervalo);
      return;
    }

    const emoji = document.createElement("div");

    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.position = "fixed";
    emoji.style.top = "-40px";
    emoji.style.left = Math.random() * window.innerWidth + "px";
    emoji.style.fontSize = (Math.random() * 15 + 20) + "px";
    emoji.style.zIndex = "999";
    emoji.style.pointerEvents = "none";

    document.body.appendChild(emoji);

    const velocidade = Math.random() * 4000 + 3000;

    const anim = emoji.animate([
      { transform: "translateY(0px)" },
      { transform: `translateY(${window.innerHeight + 100}px)` }
    ], {
      duration: velocidade,
      easing: "linear"
    });

    anim.onfinish = () => emoji.remove();

  }, 70);
}

// ==========================
// ✨ ANIMAÇÃO
// ==========================
function animarPagina(direcao) {
  if (!box) return;

  box.style.transition = "all 0.25s ease";
  box.style.transform =
    direcao === "next" ? "translateX(-40px)" : "translateX(40px)";
  box.style.opacity = "0";

  setTimeout(() => {
    box.style.transform = "translateX(0)";
    box.style.opacity = "1";
  }, 150);
}

const _proxima = proxima;
const _voltar = voltar;

window.proxima = function () {
  animarPagina("next");
  setTimeout(() => _proxima(), 120);
};

window.voltar = function () {
  animarPagina("prev");
  setTimeout(() => _voltar(), 120);
};

// GLOBAL
window.verificarSenha = verificarSenha;
window.abrirLivro = abrirLivro;
window.irPagina = irPagina;
window.resposta = resposta;
window.finalResposta = finalResposta;

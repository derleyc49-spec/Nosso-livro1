// FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "...",
  projectId: "...",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const senhaCorreta = "Mary2026";

let pagina = 1;
const total = 300;

let corFundoAtual = "#ffffff";
let corTextoAtual = "#000000";

const texto = document.getElementById("texto");
const box = document.querySelector(".box");

const emojis = ["🌺","🌹","🥀","❤️","🩷","🐻","🥰","☺️","🙃","🫂","🫀","💖","❤️‍🔥"];

// LOGIN
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";
    tocarMusica();
    chuvaEmojis();
  } else {
    alert("Senha errada 😅");
  }
}

// 🌺 CHUVA
function chuvaEmojis() {
  const tela = document.getElementById("emojiTela");
  tela.style.display = "block";

  const intervalo = setInterval(() => {
    const span = document.createElement("span");
    span.classList.add("emoji");
    span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    tela.appendChild(span);
    setTimeout(() => span.remove(), 4000);
  }, 100);

  setTimeout(() => {
    clearInterval(intervalo);
    tela.style.display = "none";
    document.getElementById("perguntaTela").style.display = "flex";
  }, 4000);
}

// DIGITAR
function digitarTexto(txt, el, vel = 25) {
  el.innerHTML = "";
  let i = 0;
  function escrever() {
    if (i < txt.length) {
      el.innerHTML += txt.charAt(i);
      i++;
      setTimeout(escrever, vel);
    }
  }
  escrever();
}

// PERGUNTA 1
function resposta(valor) {
  localStorage.setItem("resposta1", valor);
  document.getElementById("perguntaTela").style.display = "none";

  if (valor === "sim") {
    document.getElementById("segundaTela").style.display = "flex";

    digitarTexto(
`eu prometo cuidar de você, te mimar, te dar atenção como você merece e cuidar de você como uma princesa… 💖

mas eu sempre vou te perturbar 🙃`,
    document.getElementById("textoDigitando")
    );

  } else {
    alert("Mesmo com esse não vou continuar respeitando você 💖");
    document.getElementById("capa").style.display = "flex";
  }
}

// FINAL
function finalResposta(valor) {
  localStorage.setItem("respostaFinal", valor);

  document.getElementById("segundaTela").style.display = "none";
  document.getElementById("finalTela").style.display = "flex";

  digitarTexto(
    "O objetivo disso tudo está na página 33… 👀",
    document.getElementById("textoFinal"),
    40
  );

  setTimeout(() => {
    document.getElementById("finalTela").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  }, 5000);
}

// LIVRO
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
    let base = docSnap.exists() ? docSnap.data().texto || "" : "";

    if (pagina === 50) {
      const r = localStorage.getItem("respostaFinal");
      let resp = r === "sim" ? "SIM 💕" : "NÃO 😢";

      texto.value = `Você vai ser a minha só minha? 💖

Resposta: ${resp}`;
    } else {
      texto.value = base;
    }
  });
}

// NAV
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

function irPagina() {
  const num = parseInt(document.getElementById("buscarPagina").value);
  if (num >= 1 && num <= total) {
    pagina = num;
    carregar();
  }
}

// MUSICA
function tocarMusica() {
  const audio = document.getElementById("musica");
  if (audio) {
    audio.volume = 0.4;
    audio.play();
  }
}

// CORES
document.getElementById("corFundo").oninput = e => {
  corFundoAtual = e.target.value;
  box.style.background = corFundoAtual;
  salvarPagina();
};

document.getElementById("corTexto").oninput = e => {
  corTextoAtual = e.target.value;
  texto.style.color = corTextoAtual;
  salvarPagina();
};

document.getElementById("fonte").onchange = e => {
  texto.style.fontFamily = e.target.value;
};

// GLOBAL
window.verificarSenha = verificarSenha;
window.abrirLivro = abrirLivro;
window.proxima = proxima;
window.voltar = voltar;
window.irPagina = irPagina;
window.resposta = resposta;
window.finalResposta = finalResposta;

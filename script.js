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

// LOGIN
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";

    if (localStorage.getItem("jaRespondeu") === "sim") {
      document.getElementById("capa").style.display = "flex";
    } else {
      document.getElementById("perguntaTela").style.display = "flex";
    }

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
window.proxima = proxima;
window.voltar = voltar;
window.irPagina = irPagina;

// ==========================
// 🔥 PERGUNTAS
// ==========================

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

function resposta(valor) {
  localStorage.setItem("resposta1", valor);

  document.getElementById("perguntaTela").style.display = "none";
  document.getElementById("segundaTela").style.display = "flex";

  digitarTexto(
`eu prometo cuidar de você, te mimar, cuidar de você, te dar atenção como você merece e cuidar de você como uma princesa… 💖

mas eu sempre vou te perturbar 🙃`,
    document.getElementById("textoDigitando")
  );
}

function finalResposta(valor) {
  localStorage.setItem("respostaFinal", valor);
  localStorage.setItem("jaRespondeu", "sim");

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
  }, 4000);
}

// 🔥 BOTÕES FUNCIONANDO
setTimeout(() => {
  const b1 = document.querySelectorAll("#perguntaTela button");
  if (b1.length >= 2) {
    b1[0].onclick = () => resposta("sim");
    b1[1].onclick = () => resposta("nao");
  }

  const b2 = document.querySelectorAll("#segundaTela button");
  if (b2.length >= 2) {
    b2[0].onclick = () => finalResposta("sim");
    b2[1].onclick = () => finalResposta("nao");
  }
}, 500);

// ==========================
// 🔥 PÁGINA 50
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

    let resp1 = r1 === "sim" ? "Simm🥰" : r1 === "nao" ? "😖" : "...";
    let resp2 = r2 === "sim" ? "Simm🥰" : r2 === "nao" ? "😖" : "...";

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

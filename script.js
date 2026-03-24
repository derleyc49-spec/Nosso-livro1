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

// CONFIG
const senhaCorreta = "Mary2026";

let pagina = 1;
const total = 300;

let corFundoAtual = "#ffffff";
let corTextoAtual = "#000000";

// ELEMENTOS
const texto = document.getElementById("texto");
const box = document.querySelector(".box");

// 🔐 SENHA + VÍDEO
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {

    document.getElementById("senhaTela").style.display = "none";

    const telaVideo = document.getElementById("videoTela");
    const video = document.getElementById("videoIntro");

    telaVideo.style.display = "flex";

    video.currentTime = 0;
    video.volume = 0.6;

    video.play().catch(() => {
      console.log("Usuário precisa clicar no play");
    });

    video.onended = () => {
      telaVideo.style.display = "none";
      document.getElementById("capa").style.display = "flex";
    };

  } else {
    alert("Senha errada 😅");
  }
}

// 📖 ABRIR LIVRO
function abrirLivro() {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "flex";

  tocarMusica();

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

// GLOBAL
window.verificarSenha = verificarSenha;
window.abrirLivro = abrirLivro;
window.proxima = proxima;
window.voltar = voltar;
window.irPagina = irPagina;

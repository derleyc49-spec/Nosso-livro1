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
const total = 50;

const texto = document.getElementById("texto");
const box = document.querySelector(".box");

// LOGIN
function verificarSenha() {
  const senha = document.getElementById("senhaInput").value.trim();

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";
    document.getElementById("capa").style.display = "flex";
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
    if (docSnap.exists()) {
      texto.value = docSnap.data().texto || "";
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

// 🔥 VISUALIZADOR
const visual = document.querySelector(".visualizador");

setInterval(() => {
  if (visual) {
    const escala = 1 + Math.random() * 0.3;
    visual.style.transform = `scale(${escala})`;
  }
}, 300);

// 🔥 TEXTO
const letra = document.getElementById("letraTexto");
if (letra) {
  letra.innerText = "🎵 A música está tocando... sente a vibe ❤️";
}

// BOTÕES
window.verificarSenha = verificarSenha;
window.abrirLivro = abrirLivro;
window.proxima = proxima;
window.voltar = voltar;

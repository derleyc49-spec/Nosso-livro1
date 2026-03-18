import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3GPTqPod_k9wcoP83RnFbJUPnae-qc3c",
  authDomain: "nosso-livro-783fe.firebaseapp.com",
  projectId: "nosso-livro-783fe",
  storageBucket: "nosso-livro-783fe.firebasestorage.app",
  messagingSenderId: "569703141969",
  appId: "1:569703141969:web:19fde9bfe69b95a6f01e70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let pagina = 1;
const totalPaginas = 50;

const textarea = document.getElementById("texto");

/* SENHA */
window.verificarSenha = function () {
  const senha = document.getElementById("senhaInput").value;

  if (senha === "1234") {
    const tela = document.getElementById("senhaTela");
    tela.classList.add("fade-out");

    setTimeout(() => {
      tela.style.display = "none";
      document.getElementById("capa").style.display = "block";
    }, 500);

  } else {
    const input = document.getElementById("senhaInput");

    input.classList.add("erro");

    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    setTimeout(() => {
      input.classList.remove("erro");
    }, 300);
  }
};

/* ABRIR */
window.abrirLivro = function () {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "block";
  carregarPagina();
};

/* VOLTAR */
window.voltar = function () {
  if (pagina === 1) {
    document.getElementById("livro").style.display = "none";
    document.getElementById("capa").style.display = "block";
  } else {
    pagina--;
    carregarPagina();
  }
};

/* AVANÇAR */
window.proxima = function () {
  if (pagina < totalPaginas) {
    pagina++;
    carregarPagina();
  }
};

/* CARREGAR */
function carregarPagina() {
  document.getElementById("paginaNum").innerText = "Página " + pagina;

  const ref = doc(db, "livro", "pagina" + pagina);

  onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      textarea.value = docSnap.data().texto || "";
    } else {
      textarea.value = "";
    }
  });

  textarea.oninput = async () => {
    await setDoc(ref, {
      texto: textarea.value
    });
  };
}

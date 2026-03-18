import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3GPTqPod_k9wcoP83RnFbJUPnae-qc3c",
  authDomain: "nosso-livro-783fe.firebaseapp.com",
  projectId: "nosso-livro-783fe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let pagina = 1;
let unsubscribe;

const textarea = document.getElementById("texto");

/* SENHA */
window.verificarSenha = function () {
  const senha = document.getElementById("senhaInput").value;

  if (senha === "007@Mary") {
    document.getElementById("senhaTela").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  } else {
    alert("Senha errada 😢");
  }
};

/* ABRIR */
window.abrirLivro = function () {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "flex";
  carregarPagina();
};

/* NAVEGAÇÃO */
window.voltar = function () {
  if (pagina > 1) {
    pagina--;
    carregarPagina();
  }
};

window.proxima = function () {
  pagina++;
  carregarPagina();
};

/* CARREGAR */
function carregarPagina() {
  document.getElementById("paginaNum").innerText = "Página " + pagina;

  const ref = doc(db, "livro", "pagina" + pagina);

  if (unsubscribe) unsubscribe();

  unsubscribe = onSnapshot(ref, (docSnap) => {
    textarea.value = docSnap.exists() ? docSnap.data().texto : "";
  });

  textarea.oninput = () => {
    setDoc(ref, { texto: textarea.value });
  };
}

/* COR */
const corPicker = document.getElementById("corPicker");
corPicker.oninput = () => {
  document.body.style.background = corPicker.value;
};

/* CORAÇÕES */
function criarCoracao() {
  const el = document.createElement("div");
  el.className = "coracao";
  el.innerHTML = "❤️";
  el.style.left = Math.random() * 100 + "%";

  document.getElementById("coracoes").appendChild(el);

  setTimeout(() => el.remove(), 4000);
}

setInterval(criarCoracao, 800);

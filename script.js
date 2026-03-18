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
const senhaCorreta = "007@Mary";

let pagina = 1;
const total = 50;

const texto = document.getElementById("texto");

// LOGIN
function verificarSenha() {
  if (senhaInput.value === senhaCorreta) {
    senhaTela.style.display = "none";
    capa.style.display = "flex";
  } else {
    alert("Senha errada");
  }
}

// ABRIR LIVRO
function abrirLivro() {
  capa.style.display = "none";
  livro.style.display = "flex";
  carregar();
}

// SALVAR
texto.addEventListener("input", async () => {
  await setDoc(doc(db, "livro", "pagina_" + pagina), {
    texto: texto.value
  });
});

// LER EM TEMPO REAL
function carregar() {
  paginaNum.innerText = pagina + "/" + total;

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
    livro.style.display = "none";
    capa.style.display = "flex";
  }
}

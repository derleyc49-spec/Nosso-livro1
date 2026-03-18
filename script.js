const senhaCorreta = "007@Mary";

function verificarSenha() {
  const senha = document.getElementById("senhaInput").value;

  if (senha === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  } else {
    alert("Senha errada");
  }
}

function abrirLivro() {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "flex";
  carregarPagina();
}

/* SISTEMA */
let pagina = 1;
const total = 50;

let paginas = {};

for (let i = 1; i <= total; i++) {
  paginas[i] = {
    texto: "",
    corFundo: "#ffffff",
    corTexto: "#000000",
    fonte: "Arial"
  };
}

const texto = document.getElementById("texto");
const corFundo = document.getElementById("corFundo");
const corTexto = document.getElementById("corTexto");
const fonte = document.getElementById("fonte");

/* SALVAR */
texto.addEventListener("input", () => {
  paginas[pagina].texto = texto.value;
});

corFundo.addEventListener("input", () => {
  paginas[pagina].corFundo = corFundo.value;
  document.body.style.background = corFundo.value;
});

corTexto.addEventListener("input", () => {
  paginas[pagina].corTexto = corTexto.value;
  texto.style.color = corTexto.value;
});

fonte.addEventListener("change", () => {
  paginas[pagina].fonte = fonte.value;
  texto.style.fontFamily = fonte.value;
});

/* CARREGAR */
function carregarPagina() {
  let p = paginas[pagina];

  texto.value = p.texto;
  corFundo.value = p.corFundo;
  corTexto.value = p.corTexto;
  fonte.value = p.fonte;

  document.body.style.background = p.corFundo;
  texto.style.color = p.corTexto;
  texto.style.fontFamily = p.fonte;

  document.getElementById("contador").innerText = `${pagina}/50`;
}

/* AVANÇAR */
function proxima() {
  if (pagina < total) {
    pagina++;
    carregarPagina();
  }
}

/* VOLTAR */
function voltar() {
  if (pagina > 1) {
    pagina--;
    carregarPagina();
  } else {
    document.getElementById("livro").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  }
}

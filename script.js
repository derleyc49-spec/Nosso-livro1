const senhaCorreta = "007@Mary";

let pagina = 1;
const total = 50;

const texto = document.getElementById("texto");
const box = document.querySelector(".box");

function verificarSenha() {
  if (senhaInput.value === senhaCorreta) {
    senhaTela.style.display = "none";
    capa.style.display = "flex";
  } else {
    alert("Senha errada 😅");
  }
}

function abrirLivro() {
  capa.style.display = "none";
  livro.style.display = "flex";
  carregar();
}

texto.addEventListener("input", () => {
  localStorage.setItem("texto_" + pagina, texto.value);
});

function carregar() {
  texto.value = localStorage.getItem("texto_" + pagina) || "";
  paginaNum.innerText = pagina + "/" + total;

  box.style.background = localStorage.getItem("bg_" + pagina) || "white";
  texto.style.color = localStorage.getItem("cor_" + pagina) || "black";
  texto.style.fontFamily = localStorage.getItem("font_" + pagina) || "Arial";
}

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

corFundo.oninput = () => {
  box.style.background = corFundo.value;
  localStorage.setItem("bg_" + pagina, corFundo.value);
};

corTexto.oninput = () => {
  texto.style.color = corTexto.value;
  localStorage.setItem("cor_" + pagina, corTexto.value);
};

fonte.onchange = () => {
  texto.style.fontFamily = fonte.value;
  localStorage.setItem("font_" + pagina, fonte.value);
};

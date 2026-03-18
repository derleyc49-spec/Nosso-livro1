const senhaCorreta = "007@Mary";

let pagina = 1;
const total = 50;

function verificarSenha() {
  const input = document.getElementById("senhaInput").value;
  if (input === senhaCorreta) {
    document.getElementById("senhaTela").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  } else {
    alert("Senha errada 😅");
  }
}

function abrirLivro() {
  document.getElementById("capa").style.display = "none";
  document.getElementById("livro").style.display = "flex";
  carregar();
}

/* SALVAR TEXTO */
document.getElementById("texto").addEventListener("input", () => {
  localStorage.setItem("pagina_" + pagina, texto.value);
});

/* CARREGAR */
function carregar() {
  texto.value = localStorage.getItem("pagina_" + pagina) || "";
  document.getElementById("paginaNum").innerText = pagina + "/" + total;

  // cores e fonte
  const bg = localStorage.getItem("bg_" + pagina);
  const cor = localStorage.getItem("cor_" + pagina);
  const font = localStorage.getItem("font_" + pagina);

  if(bg) box.style.background = bg;
  if(cor) texto.style.color = cor;
  if(font) texto.style.fontFamily = font;
}

/* NAVEGAÇÃO */
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
    // volta pra capa
    document.getElementById("livro").style.display = "none";
    document.getElementById("capa").style.display = "flex";
  }
}

/* CORES */
corFundo.oninput = () => {
  box.style.background = corFundo.value;
  localStorage.setItem("bg_" + pagina, corFundo.value);
};

corTexto.oninput = () => {
  texto.style.color = corTexto.value;
  localStorage.setItem("cor_" + pagina, corTexto.value);
};

/* FONTE */
fonte.onchange = () => {
  texto.style.fontFamily = fonte.value;
  localStorage.setItem("font_" + pagina, fonte.value);
};

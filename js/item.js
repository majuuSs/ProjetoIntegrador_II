// Lógica da tela de detalhe (item.html).

const parametros = new URLSearchParams(window.location.search);
const idObjeto = parametros.get("id");
const cartaoDetalhe = document.getElementById("cartao-detalhe");

let usuarioAtual = null;

exigirLogin().then((usuario) => {
  usuarioAtual = usuario;
  montarCabecalho(usuario);
  carregarObjeto();
});

function carregarObjeto() {
  if (!idObjeto) {
    cartaoDetalhe.innerHTML = `<p class="vazio">Objeto não encontrado.</p>`;
    return;
  }

  db.collection("objetos").doc(idObjeto).get()
    .then((doc) => {
      if (!doc.exists) {
        cartaoDetalhe.innerHTML = `<p class="vazio">Esse objeto não existe mais.</p>`;
        return;
      }
      renderizarObjeto({ id: doc.id, ...doc.data() });
    })
    .catch((erro) => {
      cartaoDetalhe.innerHTML = `<p class="vazio">Não deu pra carregar o objeto.</p>`;
      console.error(erro);
    });
}

function renderizarObjeto(objeto) {
  const ehDono = usuarioAtual.uid === objeto.uidCadastro;

  const foto = objeto.fotoBase64
    ? `<img class="detalhe-foto" src="${objeto.fotoBase64}" alt="" />`
    : `<div class="detalhe-foto"></div>`;

  const selo = objeto.devolvido
    ? `<span class="selo selo-devolvido">Devolvido</span>`
    : objeto.tipo === "perdido"
      ? `<span class="selo selo-perdido">Perdido</span>`
      : `<span class="selo selo-achado">Achado</span>`;

  const data = objeto.dataRegistro && objeto.dataRegistro.toDate
    ? objeto.dataRegistro.toDate().toLocaleDateString("pt-BR")
    : "";

  // O botão de marcar como devolvido só aparece pra quem cadastrou
  // o item, e só se ele ainda não tiver sido marcado.
  let botaoDevolvido = "";
  if (ehDono && !objeto.devolvido) {
    botaoDevolvido = `<button class="btn btn-sucesso" id="botao-devolvido">Marcar como devolvido</button>`;
  } else if (ehDono && objeto.devolvido) {
    botaoDevolvido = `<p class="detalhe-linha">Você já marcou este item como devolvido.</p>`;
  }

  cartaoDetalhe.innerHTML = `
    ${foto}
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
      <h1>${escaparHtml(objeto.descricao)}</h1>
      ${selo}
    </div>
    <p class="detalhe-linha">📍 ${escaparHtml(objeto.local)}</p>
    <p class="detalhe-linha">📅 Registrado em ${data}</p>
    <p class="detalhe-linha">✉️ Cadastrado por ${escaparHtml(objeto.emailCadastro || "")}</p>
    ${botaoDevolvido}
  `;

  const botao = document.getElementById("botao-devolvido");
  if (botao) {
    botao.addEventListener("click", () => marcarComoDevolvido(objeto.id));
  }
}

function marcarComoDevolvido(id) {
  db.collection("objetos").doc(id).update({ devolvido: true })
    .then(() => carregarObjeto())
    .catch((erro) => {
      alert("Não deu pra atualizar. Tente novamente.");
      console.error(erro);
    });
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}

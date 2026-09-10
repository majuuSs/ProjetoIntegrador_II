// Lógica da tela inicial (inicio.html): lista os objetos, filtra por tipo
// (perdido/achado) e por palavra-chave.

let todosObjetos = [];
let filtroAtual = "todos";

const listaEl = document.getElementById("lista-objetos");
const campoPesquisa = document.getElementById("campo-pesquisa");
const abaTodos = document.getElementById("aba-todos");
const abaPerdidos = document.getElementById("aba-perdidos");
const abaAchados = document.getElementById("aba-achados");

exigirLogin().then((usuario) => {
  montarCabecalho(usuario);
  carregarObjetos();
});

function carregarObjetos() {
  db.collection("objetos")
    .orderBy("dataRegistro", "desc")
    .get()
    .then((snapshot) => {
      todosObjetos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      renderizarLista();
    })
    .catch((erro) => {
      listaEl.innerHTML = `<p class="vazio">Não deu pra carregar os objetos agora. Tente recarregar a página.</p>`;
      console.error(erro);
    });
}

function renderizarLista() {
  const termo = campoPesquisa.value.trim().toLowerCase();

  let filtrados = todosObjetos.filter((objeto) => {
    if (filtroAtual !== "todos" && objeto.tipo !== filtroAtual) return false;
    if (!termo) return true;
    const alvo = `${objeto.descricao} ${objeto.local}`.toLowerCase();
    return alvo.includes(termo);
  });

  if (filtrados.length === 0) {
    listaEl.innerHTML = `<p class="vazio">Nenhum objeto encontrado.</p>`;
    return;
  }

  listaEl.innerHTML = filtrados.map((objeto) => {
    const selo = objeto.devolvido
      ? `<span class="selo selo-devolvido">Devolvido</span>`
      : objeto.tipo === "perdido"
        ? `<span class="selo selo-perdido">Perdido</span>`
        : `<span class="selo selo-achado">Achado</span>`;

    const foto = objeto.fotoBase64
      ? `<img class="foto" src="${objeto.fotoBase64}" alt="" />`
      : `<div class="foto"></div>`;

    const data = objeto.dataRegistro && objeto.dataRegistro.toDate
      ? objeto.dataRegistro.toDate().toLocaleDateString("pt-BR")
      : "";

    return `
      <a class="item-objeto" href="item.html?id=${objeto.id}">
        ${foto}
        <div class="info">
          <p class="descricao">${escaparHtml(objeto.descricao)}</p>
          <p class="meta">${escaparHtml(objeto.local)} · ${data}</p>
        </div>
        ${selo}
      </a>
    `;
  }).join("");
}

function trocarAba(nova) {
  filtroAtual = nova;
  [abaTodos, abaPerdidos, abaAchados].forEach((el) => el.classList.remove("ativo"));
  if (nova === "todos") abaTodos.classList.add("ativo");
  if (nova === "perdido") abaPerdidos.classList.add("ativo");
  if (nova === "achado") abaAchados.classList.add("ativo");
  renderizarLista();
}

abaTodos.addEventListener("click", () => trocarAba("todos"));
abaPerdidos.addEventListener("click", () => trocarAba("perdido"));
abaAchados.addEventListener("click", () => trocarAba("achado"));
campoPesquisa.addEventListener("input", renderizarLista);

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto || "";
  return div.innerHTML;
}

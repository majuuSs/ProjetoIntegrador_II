// Lógica da tela de cadastro de objeto (novo-objeto.html).

let tipoSelecionado = "achado";
let fotoBase64 = null;
let usuarioAtual = null;

const abaAchado = document.getElementById("aba-achado");
const abaPerdido = document.getElementById("aba-perdido");
const entradaFoto = document.getElementById("entrada-foto");
const fotoPreview = document.getElementById("foto-preview");
const formObjeto = document.getElementById("form-objeto");
const botaoSalvar = document.getElementById("botao-salvar");
const mensagemErro = document.getElementById("mensagem-erro");

exigirLogin().then((usuario) => {
  usuarioAtual = usuario;
  montarCabecalho(usuario);
});

abaAchado.addEventListener("click", () => {
  tipoSelecionado = "achado";
  abaAchado.classList.add("ativo");
  abaPerdido.classList.remove("ativo");
});

abaPerdido.addEventListener("click", () => {
  tipoSelecionado = "perdido";
  abaPerdido.classList.add("ativo");
  abaAchado.classList.remove("ativo");
});

fotoPreview.addEventListener("click", () => entradaFoto.click());

entradaFoto.addEventListener("change", (evento) => {
  const arquivo = evento.target.files[0];
  if (!arquivo) return;
  comprimirImagem(arquivo, (base64) => {
    fotoBase64 = base64;
    fotoPreview.innerHTML = `<img src="${base64}" alt="Prévia da foto" />`;
  });
});

// Reduz a imagem antes de guardar, pra caber no banco de dados
// (o Firestore tem um limite de ~1MB por cadastro).
function comprimirImagem(arquivo, callback) {
  const leitor = new FileReader();
  leitor.onload = (evento) => {
    const imagem = new Image();
    imagem.onload = () => {
      const larguraMaxima = 480;
      const escala = Math.min(1, larguraMaxima / imagem.width);
      const canvas = document.createElement("canvas");
      canvas.width = imagem.width * escala;
      canvas.height = imagem.height * escala;
      const contexto = canvas.getContext("2d");
      contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.6));
    };
    imagem.src = evento.target.result;
  };
  leitor.readAsDataURL(arquivo);
}

formObjeto.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensagemErro.classList.remove("mostrar");
  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando...";

  const descricao = document.getElementById("descricao").value.trim();
  const local = document.getElementById("local").value.trim();

  db.collection("objetos").add({
    tipo: tipoSelecionado,
    descricao: descricao,
    local: local,
    fotoBase64: fotoBase64,
    dataRegistro: firebase.firestore.FieldValue.serverTimestamp(),
    devolvido: false,
    uidCadastro: usuarioAtual.uid,
    emailCadastro: usuarioAtual.email
  })
    .then(() => {
      window.location.href = "inicio.html";
    })
    .catch((erro) => {
      mensagemErro.textContent = "Não deu pra salvar o cadastro. Tente de novo.";
      mensagemErro.classList.add("mostrar");
      botaoSalvar.disabled = false;
      botaoSalvar.textContent = "Salvar cadastro";
      console.error(erro);
    });
});

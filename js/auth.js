// Funções compartilhadas de autenticação.
// Este arquivo é incluído em todas as páginas que exigem login
// (inicio.html, novo-objeto.html, item.html).

// Retorna uma Promise que resolve com o usuário logado, ou redireciona
// para a tela de login se não houver ninguém logado.
function exigirLogin() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((usuario) => {
      if (!usuario) {
        window.location.href = "index.html";
      } else {
        resolve(usuario);
      }
    });
  });
}

// Preenche o cabeçalho com o nome do usuário e liga o botão de sair.
function montarCabecalho(usuario) {
  const nomeEl = document.getElementById("nome-usuario");
  if (nomeEl) {
    nomeEl.textContent = usuario.email;
  }
  const botaoSair = document.getElementById("botao-sair");
  if (botaoSair) {
    botaoSair.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      });
    });
  }
}

## Como executar o projeto

Pra rodar o projeto, o caminho mais simples é esse:

1. Clona o repositório: (git clone)
2. Abre a pasta no VS Code.
3. Instala a extensão **Live Server**.
4. Clica com o botão direito no arquivo `index.html` e escolhe **"Open with Live Server"**.
5. O site abre no navegador, já conectado ao banco de dados na nuvem, não precisa instalar mais nada além do Live Server.

## Resultados finais

No fim das contas, o sistema ficou funcionando exatamente do jeito que planejei lá no início:

- Dá pra criar conta e fazer login com segurança
- Dá pra cadastrar um objeto achado ou perdido, com foto, descrição, local e data de registro automática
- Dá pra buscar por palavra-chave ou filtrar entre perdidos e achados
- Dá pra marcar um objeto como devolvido — e essa função só funciona mesmo pra quem cadastrou o item, a eu testei na prática e confirmo que funciona certinho
- O site se ajusta bem tanto no computador quanto no celular
- Os dados de login ficam protegidos pelo próprio sistema de autenticação do Firebase, sem nenhuma senha exposta

Os testes completos que fiz estão detalhados no arquivo testes.md.

# Achados e Perdidos — Escola

Sistema para cadastrar e buscar objetos perdidos e achados na escola, com
login por e-mail e senha.

## Tecnologias

- HTML, CSS e JavaScript puro (sem frameworks)
- Firebase Authentication (login)
- Firebase Firestore (banco de dados)

## 1. Configurar o Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e crie um projeto.
2. No menu lateral, vá em **Build > Authentication > Sign-in method** e ative
   **E-mail/senha**.
3. Vá em **Build > Firestore Database** e clique em **Criar banco de dados**
   (pode começar em modo de teste, e depois aplicar as regras da seção 3).
4. Em **Configurações do projeto** (ícone de engrenagem) > **Seus apps**,
   clique no ícone `</>` para criar um app da Web. Copie o objeto
   `firebaseConfig` gerado.
5. Cole esse objeto no arquivo `js/firebase-config.js`, substituindo os
   valores de exemplo.

## 2. Rodar localmente

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
4. O site abre no navegador e já funciona, puxando dados do Firebase.

Não é preciso instalar Node, npm ou rodar nenhum servidor manualmente — o
Live Server só serve os arquivos estáticos, e quem cuida do login e do banco
de dados é o Firebase, na nuvem.

## 3. Regras de segurança do Firestore (importante)

Por padrão, o modo de teste do Firestore libera leitura e escrita pra
qualquer pessoa. Antes de entregar o projeto, troque as regras (em
**Firestore Database > Regras**) por estas, que garantem que **só quem
cadastrou o objeto pode marcar como devolvido**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /usuarios/{usuarioId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == usuarioId;
    }

    match /objetos/{objetoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.uidCadastro == request.auth.uid;
      allow update: if request.auth != null
                    && resource.data.uidCadastro == request.auth.uid;
      allow delete: if false;
    }
  }
}
```

## 4. Publicar no GitHub Pages

```
git init
git add .
git commit -m "versão inicial do sistema de achados e perdidos"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Depois, no repositório do GitHub: **Settings > Pages > Branch: main > Save**.
Em alguns minutos, o link público aparece nessa mesma página
(algo como `seuusuario.github.io/seurepositorio`).

## Estrutura do projeto

```
achados-perdidos/
├── index.html          → tela de login e criação de conta
├── inicio.html          → listagem, busca e filtro perdidos/achados
├── novo-objeto.html     → formulário de cadastro (achado ou perdido)
├── item.html            → detalhe do objeto + marcar como devolvido
├── css/style.css
└── js/
    ├── firebase-config.js  → suas chaves do Firebase (editar aqui)
    ├── auth.js              → funções de login compartilhadas
    ├── app.js                → lógica da listagem/busca
    ├── cadastro-objeto.js    → lógica do formulário de cadastro
    └── item.js                → lógica da tela de detalhe
```

---

# Passo a passo para concluir a Etapa 3

## Requisitos do Trello já cobertos pelo código

- [x] Tela de cadastro (conta) — `index.html`
- [x] Formulário de objeto achado (descrição, foto, local) — `novo-objeto.html`
- [x] Formulário de objeto perdido — mesma tela, com a aba "Perdi um objeto"
- [x] Listagem de perdidos e achados — `inicio.html`
- [x] Busca por palavra-chave — campo de busca em `inicio.html`
- [x] Marcar como devolvido só pra quem cadastrou — `item.html` + regras do Firestore
- [x] Data de registro em cada item — preenchida automaticamente
- [x] Layout responsivo (mobile + desktop) — testado com media query em `style.css`
- [x] Criptografia de dados de login — feita pelo próprio Firebase Authentication (senha nunca é salva em texto puro)

## O que você ainda precisa fazer

1. **Configurar seu projeto Firebase** seguindo a seção 1 deste README e colar
   suas chaves em `js/firebase-config.js`.
2. **Testar localmente** com o Live Server: criar uma conta, cadastrar um
   objeto achado, um perdido, buscar por palavra-chave, e marcar um item
   como devolvido.
3. **Aplicar as regras de segurança** do Firestore (seção 3).
4. **Atualizar o Trello**: mover os cartões dessa lista para "Concluído" à
   medida que forem testando cada função — não mover tudo de uma vez.
5. **Subir o código pro GitHub** (seção 4) dentro da pasta `/src` ou
   `/produto` do repositório do projeto.
6. **Criar a Release v1.0.0** no GitHub (aba Releases > Create a new release).
7. **Escrever o relatório de validação** em `/docs/testes.md`, descrevendo
   os testes feitos (ex: "criei uma conta com e-mail X, funcionou";
   "tentei marcar como devolvido um item de outra pessoa, o botão nem
   aparece" — isso já é uma evidência de teste de segurança).
8. **Atualizar o README.md principal do projeto** (não este) com o link do
   site publicado e um resumo dos resultados alcançados.

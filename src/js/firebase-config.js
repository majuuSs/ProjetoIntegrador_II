// ATENÇÃO: troque os valores abaixo pelas chaves do SEU projeto Firebase.
// Onde encontrar: console.firebase.google.com > seu projeto > ícone de
// engrenagem (Configurações do projeto) > role até "Seus apps" > app da Web.
// Copie o objeto firebaseConfig de lá e cole exatamente aqui embaixo.

const firebaseConfig = {
  apiKey: "COLE_AQUI_SUA_API_KEY",
  authDomain: "COLE_AQUI.firebaseapp.com",
  projectId: "COLE_AQUI_O_PROJECT_ID",
  storageBucket: "COLE_AQUI.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

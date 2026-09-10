// ATENÇÃO: troque os valores abaixo pelas chaves do SEU projeto Firebase.
// Onde encontrar: console.firebase.google.com > seu projeto > ícone de
// engrenagem (Configurações do projeto) > role até "Seus apps" > app da Web.
// Copie o objeto firebaseConfig de lá e cole exatamente aqui embaixo.

const firebaseConfig = {
  apiKey: "AIzaSyD8RrC6pm_VDYA3I6WNgWBI1QkOy86BWeE",
  authDomain: "achados-e-perdidos-na-escola.firebaseapp.com",
  projectId: "achados-e-perdidos-na-escola",
  storageBucket: "achados-e-perdidos-na-escola.firebasestorage.app",
  messagingSenderId: "308978768117",
  appId: "1:308978768117:web:da28460658105395190dbc"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Substitua com suas credenciais do Firebase
const firebaseConfig = {
	apiKey: "AIzaSyDJSH9ab-sQXuUjJN_t1I7N0hJYvuZ10fU",
	authDomain: "lista-compra-407be.firebaseapp.com",
	projectId: "lista-compra-407be",
	storageBucket: "lista-compra-407be.firebasestorage.app",
	messagingSenderId: "440080728486",
	appId: "1:440080728486:web:89035dc0bfc8931ff7cf67"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
export const db = getFirestore(app);

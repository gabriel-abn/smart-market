import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Substitua com suas credenciais do Firebase
const firebaseConfig = {
	apiKey: "SUA_API_KEY",
	authDomain: "SEU_AUTH_DOMAIN",
	projectId: "SEU_PROJECT_ID",
	storageBucket: "SEU_STORAGE_BUCKET",
	messagingSenderId: "SEU_MESSAGING_SENDER_ID",
	appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
export const db = getFirestore(app);

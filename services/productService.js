import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const PRODUCTS_COLLECTION = 'produtos';

/**
 * Adiciona um novo produto à lista
 * @param {Object} product - Dados do produto (nomeProduto, quantidade, precoUnitario)
 * @returns {Promise<DocumentReference>}
 */
export const addProduct = async (product) => {
	try {
		const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
			...product,
			dataAdicao: serverTimestamp(),
			comprado: false
		});
		return docRef;
	} catch (error) {
		console.error('Erro ao adicionar produto:', error);
		throw error;
	}
};

/**
 * Atualiza um produto existente
 * @param {string} id - ID do produto
 * @param {Object} product - Dados atualizados do produto
 * @returns {Promise<void>}
 */
export const updateProduct = async (id, product) => {
	try {
		const productRef = doc(db, PRODUCTS_COLLECTION, id);
		await updateDoc(productRef, product);
	} catch (error) {
		console.error('Erro ao atualizar produto:', error);
		throw error;
	}
};

/**
 * Deleta um produto
 * @param {string} id - ID do produto
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
	try {
		await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
	} catch (error) {
		console.error('Erro ao deletar produto:', error);
		throw error;
	}
};

/**
 * Marca/desmarca produto como comprado
 * @param {string} id - ID do produto
 * @param {boolean} comprado - Status de comprado
 * @returns {Promise<void>}
 */
export const markAsPurchased = async (id, comprado) => {
	try {
		const productRef = doc(db, PRODUCTS_COLLECTION, id);
		await updateDoc(productRef, { comprado });
	} catch (error) {
		console.error('Erro ao marcar produto:', error);
		throw error;
	}
};

/**
 * Obtém listener em tempo real para os produtos
 * @param {Function} callback - Função chamada quando há mudanças
 * @returns {Function} Unsubscribe function
 */
export const subscribeToProducts = (callback) => {
	const q = query(
		collection(db, PRODUCTS_COLLECTION),
		orderBy('dataAdicao', 'desc')
	);

	return onSnapshot(q, (snapshot) => {
		const products = [];
		snapshot.forEach((doc) => {
			products.push({
				id: doc.id,
				...doc.data()
			});
		});
		callback(products);
	}, (error) => {
		console.error('Erro ao escutar produtos:', error);
	});
};

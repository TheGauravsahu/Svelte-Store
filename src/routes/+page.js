import { db } from '$lib/firebase.js';
import { getDocs, collection } from 'firebase/firestore';

export async function load() {
	try {
		const productsCollection = collection(db, 'products');
		const productsSnapshot = await getDocs(productsCollection);

		const products = productsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		return {
			products
		};
	} catch (error) {
		console.error('Error fetching products:', error);
		return {
			products: []
		};
	}
}

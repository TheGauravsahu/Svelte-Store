import { db } from '$lib/firebase.js';
import { getDoc, doc } from 'firebase/firestore';

export async function load({ params }) {
	try {
		const productId = params.id;
		const productDocRef = doc(db, 'products', productId);
		const productDoc = await getDoc(productDocRef);

		if (!productDoc.exists()) {
			throw new Error('Product not found');
		}

		const product = {
			id: productDoc.id,
			...productDoc.data()
		};
		return {
			product
		};
	} catch (error) {
		console.error('Error fetching product:', error);
		return {
			product: null
		};
	}
}

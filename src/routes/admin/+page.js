import { collection ,getDocs} from 'firebase/firestore';
import { db } from '$lib/firebase.js';

export async function load() {
	try {
		const ordersCollection = collection(db, 'orders');
		const ordersSnapshot = await getDocs(ordersCollection);
		const ordersList = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return { orders: ordersList };
	} catch (error) {
		console.error(error);
		return {
			orders: []
		};
	}
}

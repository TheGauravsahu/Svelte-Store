import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import {
	doc,
	setDoc,
	getDoc,
	updateDoc,
	onSnapshot,
	collection,
	query,
	orderBy
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAUy8nrwc5o-3wT7rZA4LcXizTlw-j7YzM',
	authDomain: 'svelte-store-3c5b1.firebaseapp.com',
	projectId: 'svelte-store-3c5b1',
	storageBucket: 'svelte-store-3c5b1.appspot.com',
	messagingSenderId: '542013277168',
	appId: '1:542013277168:web:6fc0df9665902cc3721335'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();

export const signInGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			user.set(result.user);
			error.set(null);
			goto('/cart');
		})
		.catch((err) => {
			console.log(err);
			error.set(err.code);
		});
};

export const signedOut = () => {
	signOut(auth);
};

export const user = writable(null);
export const error = writable(null);
export const isLoading = writable(false);

export const productsStore = writable([]);

export const addToCart = async (product) => {
	const userId = auth.currentUser.uid;
	const cartRef = doc(db, 'cart', userId);
	const cartDoc = await getDoc(cartRef);

	if (cartDoc.exists()) {
		const currentCart = cartDoc.data().products || [];
		const existingProduct = currentCart.find((item) => item.id === product.id);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			currentCart.push({ ...product, quantity: 1 });
		}
		await updateDoc(cartRef, { products: currentCart });
	} else {
		await setDoc(cartRef, { products: [{ ...product, quantity: 1, userId: userId }] });
	}
};

export function subscribeToCart() {
	const userId = auth.currentUser.uid;
	const cartRef = doc(db, 'cart', userId);

	const unsubscribe = onSnapshot(cartRef, (doc) => {
		if (doc.exists()) {
			const data = doc.data();
			const products = data.products || [];
			productsStore.set(products);
		} else {
			productsStore.set([]);
		}
	});

	return unsubscribe;
}

export const decreaseQuantity = async (product) => {
	const userId = auth.currentUser.uid; // Get the current user ID
	const cartRef = doc(db, 'cart', userId); // Reference to the cart document in Firestore
	const cartDoc = await getDoc(cartRef); // Fetch the cart document

	if (cartDoc.exists()) {
		const currentCart = cartDoc.data().products || []; // Get the current products in the cart
		const existingProduct = currentCart.find((item) => item.id === product.id); // Find the product in the cart

		if (existingProduct) {
			if (existingProduct.quantity > 1) {
				// Decrease the quantity by 1 if it's greater than 1
				existingProduct.quantity -= 1;
			} else {
				// Remove the product if its quantity is 1
				const updatedCart = currentCart.filter((item) => item.id !== product.id);
				await updateDoc(cartRef, { products: updatedCart });
				return;
			}

			// Update the cart with the new product quantities
			await updateDoc(cartRef, { products: currentCart });
		}
	}
};

export const increaseQuantity = async (product) => {
	const userId = auth.currentUser.uid;
	const cartRef = doc(db, 'cart', userId);
	const cartDoc = await getDoc(cartRef);

	if (cartDoc.exists()) {
		const currentCart = cartDoc.data().products || []; // Get the current products in the cart
		const existingProduct = currentCart.find((item) => item.id === product.id); // Find the product in the cart

		if (existingProduct) {
			// Increase the quantity of the product
			existingProduct.quantity += 1;
			// Update the cart with the new product quantities
			await updateDoc(cartRef, { products: currentCart });
		}
	}
};

export const createOrder = async (orderData) => {
	try {
		const userId = auth.currentUser.uid;
		const orderRef = doc(collection(db, 'orders'));
		const order = {
			...orderData,
			status: 'pending',
			createdAt: new Date(),
			userId: userId
		};
		productsStore.set([]);
		await setDoc(orderRef, order);
		
		const cartRef = doc(db, 'cart', userId);
		await setDoc(cartRef, { products: [] });

		productsStore.set([]);

		goto('/');
	} catch (error) {
		console.log(error);
	}
};

export const updateOrderStatus = async (orderId, newStatus) => {
	try {
		const orderRef = doc(db, 'orders', orderId); // Get a reference to the document
		await updateDoc(orderRef, { status: newStatus }); // Update the status
	} catch (error) {
		console.log(error);
	}
};

import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore'; 
import { db, auth } from '$lib/firebase.js'; 

export async function load() {
    try {
        const userId = auth.currentUser?.uid; // Use optional chaining in case user is not logged in
        if (!userId) {
            return { orders: [] }; // Return empty array if user is not logged in
        }

        const ordersRef = collection(db, 'orders'); 
        
        const q = query(
            ordersRef,
            where('userId', '==', userId), 
            orderBy('createdAt', 'desc') 
        );

        // Create an empty array to hold orders
        const orders = [];
        
        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            orders.length = 0; // Clear the existing orders
            snapshot.docs.forEach(doc => {
                orders.push({ id: doc.id, ...doc.data() }); // Push new orders into the array
            });
        });

        // Return the orders array, ensuring to clean up
        return {
            orders,
            unsubscribe // Return unsubscribe method to be called when component is destroyed
        };
        
    } catch (error) {
        console.error(error); 
        return {
            orders: [] 
        };
    }
}

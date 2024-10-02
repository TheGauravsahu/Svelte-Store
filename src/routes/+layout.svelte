<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/header.svelte';
	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, user, db, error } from '$lib/firebase.js';
	import { goto } from '$app/navigation';
	import { doc, getDoc } from 'firebase/firestore';

	async function checkAdmin(currentUser) {
		try {
			if (!currentUser) {
				goto('/');
				return;
			}

			const adminDocRef = doc(db, 'admins', currentUser.uid);
			const adminDoc = await getDoc(adminDocRef);

			if (adminDoc.exists()) {
				error.set(null);
				user.set({ ...currentUser, isAdmin: true });
			} else {
				goto('/');
			}
		} catch (err) {
			console.error('Error checking admin status:', err);
			goto('/error');
		}
	}

	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				user.set(currentUser);
				checkAdmin(currentUser);
			} else {
				user.set(null);
				goto('/');
			}
		});
	});
</script>

<Header></Header>
<main class="mx-auto mt-16 min-h-screen w-full px-16 md:px-24">
	<slot></slot>
</main>
<Footer></Footer>

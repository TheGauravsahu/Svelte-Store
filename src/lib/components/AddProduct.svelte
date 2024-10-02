<script>
	import { db, error, storage, user, isLoading,auth } from '$lib/firebase.js';
	import { addDoc, collection } from 'firebase/firestore';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	let categories = ['Food', 'Electronics', 'Clothes', 'Books', 'Home Appliances','Design'];
	let productStatus = ['Available', 'Out of Stock', 'Pre-order'];

	let formData = {
		title: '',
		description: '',
		price: '',
		category: '',
		stockQuantity: 0,
		productStatus: '',
		image: null
	};

	function handleFile(event) {
		formData.image = event.target.files[0];
	}

	async function addProduct() {
		try {
			isLoading.set(true);

			if (!auth.currentUser) {
				throw new Error('User is not authenticated.');
			}

			if (formData.image) {
				// Upload the image to Firebase Storage
				const storageRef = ref(storage, `products/${formData.image.name}`);
				const snapshot = await uploadBytes(storageRef, formData.image);
				const downloadURL = await getDownloadURL(snapshot.ref);

				// Add product data along with the image URL to Firestore
				const productsRef = collection(db, 'products');

				await addDoc(productsRef, {
					title: formData.title,
					description: formData.description,
					price: formData.price,
					category: formData.category,
					stockQuantity: formData.stockQuantity,
					productStatus: formData.productStatus,
					imageUrl: downloadURL // Image URL from Firebase Storage
				});

				error.set(null);
				formData = {
					title: '',
					description: '',
					price: '',
					category: '',
					stockQuantity: 0,
					productStatus: '',
					image: null
				};
			} else {
				throw new Error('Image is required.');
			}
		} catch (err) {
			console.log(err);
			error.set(err.message);
		} finally {
			isLoading.set(false);
			error.set(null);
		}
	}
</script>

<form on:submit|preventDefault={addProduct}>
	<h1 class="text-2xl font-semibold">Add a Product</h1>
	<div class="mt-4 flex flex-col gap-3">
		<input
			bind:value={formData.title}
			placeholder="Title"
			type="text"
			class="input input-bordered w-[40vw]"
		/>
		<textarea
			bind:value={formData.description}
			type="text"
			placeholder="Description"
			class="input input-bordered input-lg w-[40vw]"
		/>
		<input
			bind:value={formData.price}
			placeholder="Price"
			type="text"
			class="input input-bordered w-[40vw]"
		/>
		<select
			bind:value={formData.category}
			class="select select-bordered w-full text-base text-slate-400"
		>
			<option disabled selected>Select a category</option>
			{#each categories as category}
				<option>{category}</option>
			{/each}
		</select>
		<input
			bind:value={formData.stockQuantity}
			placeholder="Stock Quantity"
			type="number"
			min="0"
			class="input input-bordered w-full"
			required
		/>
		<select
			bind:value={formData.productStatus}
			class="select select-bordered w-full text-base text-slate-400"
			required
		>
			<option disabled selected>Select product status</option>
			{#each productStatus as status}
				<option>{status}</option>
			{/each}
		</select>
		<input
			on:change={handleFile}
			type="file"
			accept="image/*"
			class="file-input file-input-bordered w-full"
			required
		/>
		{#if $error}
			<p class="text-red-600">{$error}</p>
		{/if}
		<button disabled={$isLoading} type="submit" class="btn mt-4 w-full bg-[#6C7FD8]">
			Add Product
		</button>
	</div>
</form>

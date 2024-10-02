<script>
	import CartProduct from '$lib/components/CartProduct.svelte';

	import { onMount } from 'svelte';
	import { subscribeToCart, productsStore, createOrder } from '$lib/firebase.js';

	let products = [];
	let total = 0;

	const calculateTotal = () => {
		total = products.reduce((acc, product) => {
			const price = parseFloat(product.price.replace(/,/g, '')) || 0;
			const quantity = parseInt(product.quantity) || 0;

			return acc + price * quantity;
		}, 0);
	};

	onMount(() => {
		const unsubscribe = subscribeToCart();
		return () => {
			unsubscribe();
		};
	});

	productsStore.subscribe((value) => {
		products = value;
		calculateTotal();
	});
</script>

<section class="h-full w-full p-8">
	<ul>
		{#if products.length > 0}
			{#each products as product}
				<CartProduct {product} />
			{/each}
		{:else}
			<p>No products found.</p>
		{/if}
	</ul>
	<div class="bb-bottom-cart">
		<div
			class="cart-sub-total mt-[20px] flex flex-wrap justify-between border-t-[1px] border-solid border-[#eee] pb-[8px]"
		>
			<table class="cart-table table mt-[10px] w-full align-top">
				<tbody>
					<tr>
						<td class="title p-[.5rem] font-medium text-[#777]">Total :</td>
						<td class="price p-[.5rem] text-right text-[#777]">₹{total.toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="cart-btn mb-[20px] flex justify-between">
			<a
				href="/"
				class="bb-btn-1 font-Poppins rounded-[10px] border-[1px] border-solid border-[#3d4750] bg-transparent px-[15px] py-[5px] text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#3d4750] transition-all duration-[0.3s] ease-in-out hover:border-[#6c7fd8] hover:bg-[#6c7fd8] hover:text-[#fff]"
				>View Products</a
			>
			<button
				on:click={() => createOrder(products)}
				class="bb-btn-2 font-Poppins rounded-[10px] border-[1px] border-solid border-[#6c7fd8] bg-[#6c7fd8] px-[15px] py-[5px] text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#fff] transition-all duration-[0.3s] ease-in-out hover:border-[#3d4750] hover:bg-transparent hover:text-[#3d4750]"
				>Checkout</button
			>
		</div>
	</div>
</section>

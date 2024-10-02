<script>
	import { user, addToCart } from '$lib/firebase.js';
	export let data;
	const product = data.product;
</script>

<section
	class="mt-2 flex min-h-screen w-full flex-col items-center gap-8 md:flex-row md:items-start lg:mt-0 lg:p-8"
>
	{#if product}
		<div class="mt-4 lg:mt-0 lg:w-[40%]">
			<img src={product.imageUrl} alt="" />
		</div>
		<div class="lg:w-[50%]">
			<h1 class="my-2 text-2xl font-semibold">{product.title}</h1>
			<p class="mb-2 text-slate-400">{product.category}</p>
			<hr />
			<p class="my-2 text-xl font-semibold">₹{product.price}</p>
			<hr />
			<h3 class="my-2 font-semibold">About this item</h3>
			<p class="my-2">{product.description}</p>
			<hr />
			<p><span class="font-semibold">Stock : </span> {product.stockQuantity}</p>
			<br />
			<button
				on:click={() => addToCart(product)}
				class="btn rounded bg-[#6C7FD8] px-4 py-2 font-bold text-white hover:scale-110 hover:bg-sky-600"
				>Add to Cart</button
			>
		</div>
	{:else}
		<div class="w-full lg:w-[40%]">
			<div class="skeleton h-[50vw] w-full lg:w-[30vw]"></div>
		</div>

		<div class="w-full lg:w-[50%]">
			<div class="skeleton my-2 h-4 w-28"></div>
			<div class="skeleton h-4 w-full"></div>
			<br />
			<div class="skeleton h-4 w-28"></div>
			<br />
			<div class="skeleton my-2 h-4 w-28"></div>
			<div class="skeleton h-32 w-full"></div>
			<br />
			<div class="skeleton my-2 h-4 w-28"></div>
			<br />
			<div class="btn skeleton w-[90px] rounded px-4 py-2"></div>
		</div>
	{/if}
</section>

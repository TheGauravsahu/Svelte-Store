<script>
	export let product;
	import { addToCart } from '$lib/firebase.js';
</script>

<div class="relative h-[550px] w-[300px] cursor-pointer rounded-lg border shadow-sm">
	<a data-sveltekit-preload-data="hover" href="/product/{product.id}">
		<img
			src={product.imageUrl}
			alt=""
			class="h-[60%] w-full border-b object-cover transition-all duration-100 ease-in-out hover:scale-90"
		/>
	</a>
	<div class="flex w-full flex-col gap-1 px-8">
		<p class="text-sm">{product.category}</p>
		<h2 class="text-md font-semibold">{product.title}</h2>
		<p class="text-md font-bold">₹{product.price}</p>
	</div>
	<div class="absolute bottom-4 left-8 mt-2 w-full items-center justify-center gap-4">
		<button class="btn bg-[#6C7FD8]" on:click={() => addToCart(product)}>Add to Cart</button>
		<a data-sveltekit-preload-data="hover" href="/product/{product.id}" class="btn">View Details</a>
	</div>
</div>

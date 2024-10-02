<script>
	import Card from './Card.svelte';
	export let products;
</script>

<section class="mt-8 pb-16">
	<h1 class="my-4 text-2xl font-semibold">Trending products</h1>

	<div class="flex flex-wrap items-center gap-8">
		{#if products.length > 0}
			{#each products as product (product.id)}
				<Card {product} />
			{/each}
		{:else}
			<div class="flex w-52 flex-col gap-4">
				<div class="skeleton h-32 w-full"></div>
				<div class="skeleton h-4 w-28"></div>
				<div class="skeleton h-4 w-full"></div>
				<div class="skeleton h-4 w-full"></div>
			</div>
		{/if}
	</div>
</section>

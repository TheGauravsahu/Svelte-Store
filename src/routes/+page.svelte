<script>
	import Hero from '$lib/components/Hero.svelte';
	import Trending from '$lib/components/Trending.svelte';
	export let data;
</script>

<Hero />
<br />
<hr />
<Trending products={data.products}/>

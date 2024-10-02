<script>
	export let product;
	import { decreaseQuantity,increaseQuantity } from '$lib/firebase.js';
</script>

<li
	class="cart-sidebar-list relative mb-[24px] flex rounded-[20px] border-[1px] border-solid border-[#eee] bg-[#f8f8fb] p-[20px] max-[575px]:p-[10px]"
>
	<button
		type="button"
		href=""
		class="cart-remove-item absolute right-[-3px] top-[-3px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] bg-[#3d4750] text-[15px] text-[#fff] opacity-[0.5] transition-all duration-[0.3s] ease-in-out"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
		></button
	>
	<a
		href=""
		class="bb-cart-pro-img flex shrink-[0] grow-[1] basis-[25%] items-center max-[575px]:flex-[initial]"
	>
		<img
			src={product.imageUrl}
			alt="product-img-1"
			class="w-[85px] rounded-[10px] border-[1px] border-solid border-[#eee] max-[575px]:w-[50px]"
		/>
	</a>
	<div class="bb-cart-contact relative shrink-[0] grow-[1] basis-[70%] overflow-hidden pl-[15px]">
		<a
			href="product-left-sidebar.html"
			class="bb-cart-sub-title font-Poppins mb-[8px] block w-full overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-medium leading-[18px] tracking-[0.03rem] text-[#3d4750]"
			>{product.title}</a
		>
		<span
			class="cart-price font-Poppins mb-[8px] block text-[14px] font-light leading-[18px] tracking-[0.03rem] text-[#686e7d]"
		>
			<span class="new-price px-[3px] text-[15px] font-bold leading-[18px] text-[#686e7d]"
				>{product.price}</span
			>
			x {product.quantity}
		</span>
		<div class="flex w-16 items-center justify-center gap-3 bg-white">
			<button type="button" on:click={()=>increaseQuantity(product)} class="text-xl">+</button>
			<p class="">{product.quantity}</p>
			<button type="button" on:click={() => decreaseQuantity(product)} class="text-2xl">-</button>
		</div>
	</div>
</li>

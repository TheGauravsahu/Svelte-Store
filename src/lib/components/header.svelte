<script>
	import { user, signedOut } from '$lib/firebase.js';

	let isOpen = false;
</script>

<header
	class="w-full z-[999999] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 fixed top-0 left-0 shadow-sm"
>
	<nav class="w-full flex justify-around p-4">
		<a data-sveltekit-preload-data="tap" href="/" class="text-xl font-bold">SvelteStore</a>
		<ul class="flex items-center gap-4">
			<li>
				<a data-sveltekit-preload-data="hover"  class="flex items-center gap-1" href="/cart">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-shopping-cart"
						><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path
							d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
						/></svg
					>Cart
				</a>
			</li>
			<li>
				<a data-sveltekit-preload-data="hover"  class="flex items-center gap-1" href="/order">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-package"
						><path d="m7.5 4.27 9 5.15" /><path
							d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
						/><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg
					>Orders
				</a>
			</li>
			{#if $user}
				<li>
					{#if $user.photoURL}
						<button
							on:click={() => {
								isOpen = !isOpen;
							}}><img class="rounded-full w-8" src={$user.photoURL} alt={$user.email} /></button
						>
					{:else}
						<button
							on:click={() => {
								isOpen = !isOpen;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-user"
								><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
									cx="12"
									cy="7"
									r="4"
								/></svg
							>
						</button>
					{/if}
				</li>
			{:else}
				<li><a data-sveltekit-preload-data="tap" href="/login">Login</a></li>
			{/if}
		</ul>

		<!-- user menu -->
		{#if isOpen}
			<div
				class="absolute right-28 bg-zinc-50 h-[150px] w-[300px] shadow-sm top-16 p-4 flex gap-2 flex-col"
			>
				<p>Email : {$user.email}</p>
				{#if $user.displayName}
					<p>Name : {$user.displayName}</p>
				{/if}
				<button
					on:click={() => {
						signedOut();
						isOpen = false;
					}}
					class="flex gap-1"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-log-out"
						><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline
							points="16 17 21 12 16 7"
						/><line x1="21" x2="9" y1="12" y2="12" /></svg
					>Logout</button
				>
				{#if $user.isAdmin}
					<a
						on:click={() => {
							isOpen = false;
						}}
						href="/admin"
						class="underline">Go to Admin Dashboard</a
					>
				{/if}
			</div>
		{/if}
	</nav>
</header>

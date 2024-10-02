<script>
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
	import { signInAnonymously } from 'firebase/auth';
	import { auth, signInGoogle, user, error } from '$lib/firebase.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';
	let mode = 'signIn';

	async function handleSubmit() {
		try {
			if (mode === 'signIn') {
				const result = await signInWithEmailAndPassword(auth, email, password);
				user.set(result.user);
				error.set(null);
				goto('/cart');
			} else {
				const result = await createUserWithEmailAndPassword(auth, email, password);
				user.set(result.user);
				error.set(null);
			}
			email = '';
			password = '';
		} catch (err) {
			console.log(err);
			error.set(err.code);
		}
	}
	onMount(() => {
		const unsubscribe = user.subscribe((currentUser) => {
			if (currentUser) {
				goto('/cart');
			}
		});

		return () => unsubscribe();
	});
</script>

{#if !$user}
	<div class="flex justify-center items-center min-h-screen flex-col">
		<div
			class="flex justify-center items-center flex-col gap-4 rounded-2xl bg-zinc-200 lg:w-2/5 w-full h-[500px]"
		>
			<h1 class="text-3xl font-semibold mb-8">
				{#if mode == 'signIn'}
					Sign In
				{:else}
					Sign Up
				{/if}
			</h1>
			<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
						/>
					</svg>
					<input bind:value={email} type="text" class="grow" placeholder="Email" />
				</label>
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input type="password" placeholder="Password" class="grow" bind:value={password} />
				</label>
				{#if $error}
					<p class="text-center text-red-600">{$error}</p>
				{/if}

				<button class="btn" type="submit">
					{#if mode == 'signIn'}
						Sign In
					{:else}
						Sign Up
					{/if}
				</button>
			</form>
			or
			<button class="btn bg-[#6C7FD8]" on:click={() => signInGoogle()}>
				Sign In with Google
			</button>
			<button class="underline" on:click={() => signInAnonymously(auth)}>Continue as Guest</button>

			{#if mode == 'signIn'}
				<button on:click={() => (mode = 'signUp')}>Don't have an account ? Sign Up</button>
			{:else}
				<button on:click={() => (mode = 'signIn')}>Already have an account ? Sign In</button>
			{/if}
		</div>
	</div>
{:else}
	<p>Redirecting to your cart...</p>
{/if}

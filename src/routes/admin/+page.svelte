<script>
	import { user } from '$lib/firebase.js';
	import { writable } from 'svelte/store';
	import AddProduct from '$lib/components/AddProduct.svelte';
	import { updateOrderStatus } from '$lib/firebase.js';

	const selectTab = writable('dashboard');

	const handleStatusChange = async (orderId, newStatus) => {
		try {
			await updateOrderStatus(orderId, newStatus);
			alert(`Order ${orderId} updated to ${newStatus}`);
		} catch (error) {
			console.error('Error updating status:', error);
			alert('Failed to update status. Try again.');
		}
	};

	export let data;
	console.log(data);
</script>

{#if $user && $user.isAdmin}
	<div class="m-0 flex gap-4 p-4 px-0">
		<aside
			class="flex h-screen w-[50%] flex-col items-start gap-2 border p-8 md:w-[40%] lg:w-[30%]"
		>
			<button on:click={() => selectTab.set('addProduct')} class="w-18 btn">Add Product</button>
			<button on:click={() => selectTab.set('orders')} class="w-18 btn">All Orders</button>
		</aside>

		{#if $selectTab === 'dashboard'}
			<div class="relative bg-[#FEFEFE]">
				<h1
					class="z-[98] mb-4 text-xl font-bold lg:absolute lg:right-0 lg:top-1 lg:mb-0 lg:w-[30%] lg:text-right"
				>
					Welcome to the Admin Dashboard
				</h1>
				<img
					src="https://img.freepik.com/premium-photo/man-sits-orange-chair-with-laptop-rabbit-background_1117469-6258.jpg"
					alt="Admin"
				/>
			</div>
		{:else if $selectTab === 'addProduct'}
			<AddProduct />
		{:else if $selectTab === 'orders'}
			<section class="p-8">
				<h1 class="text-4xl font-semibold">Orders</h1>
				<br />
				{#if data.orders.length > 0}
					<table class="cart-table table mt-[10px] w-full align-top">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Product Image</th>
								<th>Product Name</th>
								<th>Status</th>
								<th>Quantity</th>
								<th>Total Price</th>
								<th>Created At</th>
							</tr>
						</thead>
						<tbody>
							{#each data.orders as order}
								{#each Object.keys(order).filter((key) => !['id', 'userId', 'createdAt', 'status'].includes(key)) as productKey}
									<tr>
										<td>{order.id}</td>
										<td
											><img
												class="w-20"
												src={order[productKey].imageUrl}
												alt={order[productKey].title}
											/></td
										>
										<td>{order[productKey].title}</td>
										<td>
											<!-- Dropdown to select status -->
											<select
												bind:value={order.status}
												on:change={() => handleStatusChange(order.id, order.status)}
											>
												<option value="pending">Pending</option>
												<option value="delivered">Delivered</option>
												<option value="shipped">Shipped</option>
											</select>
										</td>
										<td>{order[productKey].quantity}</td>
										<td>₹{order[productKey].price}</td>
										<td>{new Date(order.createdAt.seconds * 1000).toLocaleString()}</td>
									</tr>
								{/each}
							{/each}
						</tbody>
					</table>
				{:else}
					<p>No orders found.</p>
				{/if}
			</section>
		{/if}
	</div>
{:else}
	<p>Redirecting....</p>
{/if}

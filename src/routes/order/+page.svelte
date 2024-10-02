<script>
	export let data;

	// Map orders and extract products from numeric keys (like "0", "1", etc.)
	const orders = data.orders.map((order) => {
		const productKeys = Object.keys(order).filter(key => !isNaN(key)); // Get numeric keys
		const products = productKeys.map(key => order[key]); // Map numeric keys to products
		return { ...order, products }; // Add products array to the order
	});

	// Function to format the date
	const formatDate = (timestamp) => {
		const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
		return date.toLocaleString(); // Convert to readable string
	};
</script>

<section class="p-8">
	<h1 class="text-4xl font-semibold">Orders</h1>
	<br />
	{#if orders.length > 0}
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
				{#each orders as order}
					{#each order.products as product} <!-- Loop through each product in the order -->
						<tr>
							<td>{order.id}</td>
							<!-- Product Image -->
							<td><img class="w-20" src={product.imageUrl} alt={product.title} /></td>
							<!-- Product Name -->
							<td>{product.title}</td>
							<!-- Order Status -->
							<td>{order.status}</td>
							<!-- Product Quantity -->
							<td>{product.quantity}</td>
							<!-- Product Price -->
							<td>₹{product.price}</td>
							<!-- Created At (Order Creation Date) -->
							<td>{formatDate(order.createdAt)}</td>
						</tr>
					{/each}
				{/each}
			</tbody>
		</table>
	{:else}
		<p>No orders found.</p>
	{/if}
</section>

<script>
	import {
		filteredItems,
		stats,
		filter,
		setFilter,
		ListItem,
		AddTodoForm,
		Stack,
		Box,
		Grid
	} from '$lib';

	const filters = [
		{ key: 'all', label: 'Total', color: 'text-accent', value: () => stats().total },
		{
			key: 'completed',
			label: 'Completed',
			color: 'text-green-400',
			value: () => stats().completed
		},
		{ key: 'active', label: 'Pending', color: 'text-orange-400', value: () => stats().pending }
	];
</script>

<Stack spacing="space-y-4">
	<!-- Add Todo Form -->
	<AddTodoForm />

	<!-- Todo Statistics -->
	{#if stats().total > 0}
		<Box padding="p-2" className="rounded-lg">
			<Grid cols={3} gap="gap-4" className="text-sm text-center">
				{#each filters as { key, label, color, value } (key)}
					<Box
						on:click={() => setFilter(key)}
						className="cursor-pointer rounded-lg transition-colors hover:opacity-80"
					>
						<div class={`text-lg font-bold ${filter() === key ? color : 'text-text-secondary'}`}>
							{value()}
						</div>
						<div class={`${filter() === key ? `${color} font-semibold` : 'text-text-secondary'}`}>
							{label}
						</div>
					</Box>
				{/each}
			</Grid>
		</Box>
	{/if}

	<!-- Todo List -->
	{#if stats().total > 0}
		<Stack spacing="space-y-2">
			{#each filteredItems() as item (item.id)}
				{#if item && item.id}
					<ListItem {item} />
				{/if}
			{/each}
		</Stack>
	{:else}
		<Box
			className="text-center py-8 text-text-secondary border border-tertiary rounded-lg"
			padding="p-6"
		>
			<p>No todos yet. Add one above to get started!</p>
		</Box>
		<p class="text-xs text-gray-400">Current filter: {filter()}</p>
	{/if}
</Stack>

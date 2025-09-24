<script>
	import {
		filteredItems,
		stats,
		filter,
		setFilter,
		FILTER_TYPES,
		ListItem,
		AddTodoForm,
		Stack,
		Box,
		Grid
	} from '$lib';
	import { CheckCircle, AlarmClock, Target } from 'lucide-svelte';

	const filters = [
		{ key: FILTER_TYPES.ALL, label: 'Total', color: 'text-accent', value: () => stats().total, icon: Target },
		{
			key: FILTER_TYPES.COMPLETED,
			label: 'Completed',
			color: 'text-green-400',
			value: () => stats().completed,
			icon: CheckCircle
		},
		{ key: FILTER_TYPES.ACTIVE, label: 'Pending', color: 'text-orange-400', value: () => stats().pending, icon: AlarmClock }
	];
</script>

{#snippet todoStats()}
	<Box padding="p-2" className="rounded-lg">
		<Grid cols={3} gap="gap-2 sm:gap-4" className="text-xs sm:text-sm text-center">
			{#each filters as { key, label, color, value, icon } (key)}
				<Box
					onclick={() => setFilter(key)}
					className="cursor-pointer rounded-lg transition-colors active:opacity-80 sm:hover:opacity-80 p-2 sm:p-3"
				>
					<div
						class={`text-sm font-bold sm:text-lg ${filter() === key ? color : 'text-text-secondary'} flex items-center justify-center gap-1`}
					>
						<svelte:component this={icon} class="h-3 w-3 sm:h-4 sm:w-4" />
						<span>{value()}</span>
					</div>
					<div
						class={`text-xs sm:text-sm ${filter() === key ? `${color} font-semibold` : 'text-text-secondary'}`}
					>
						{label}
					</div>
				</Box>
			{/each}
		</Grid>
	</Box>
{/snippet}

{#snippet todoList()}
	<Stack spacing="space-y-2">
		{#each filteredItems() as item (item.id)}
			{#if item && item.id}
				<ListItem {item} />
			{/if}
		{/each}
	</Stack>
{/snippet}

{#snippet emptyState()}
	<Box
		className="text-center py-8 text-text-secondary border border-tertiary rounded-lg"
		padding="p-6"
	>
		<p>No todos yet. Add one above to get started!</p>
	</Box>
{/snippet}

<Stack spacing="space-y-4">
	<!-- Add Todo Form -->
	<AddTodoForm />

	<!-- Todo Statistics -->
	{#if stats().total > 0}
		{@render todoStats()}
	{/if}

	<!-- Todo List -->
	{#if stats().total > 0}
		{@render todoList()}
	{:else}
		{@render emptyState()}
		<p class="text-xs text-gray-400">Current filter: {filter()}</p>
	{/if}
</Stack>

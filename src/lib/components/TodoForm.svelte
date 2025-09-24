<script>
	import { preventDefault } from 'svelte/legacy';
	import { Save, Plus, X } from 'lucide-svelte';

	import { Stack, Flex, Grid, Box, priorityOptions, PRIORITY_LEVELS } from '$lib';

	/**
	 * @typedef {Object} Props
	 * @property {any} [todo]
	 * @property {any} [onSubmit]
	 * @property {any} [onCancel]
	 * @property {string} [variant] - Box variant
	 * @property {boolean} [showCancel] - show cancel button
	 */

	/** @type {Props} */
	let {
		todo = $bindable({ title: '', description: '', dueDate: '', priority: PRIORITY_LEVELS.MEDIUM }),
		onSubmit = () => {},
		onCancel = () => {},
		variant = 'primary',
		showCancel = true
	} = $props();
</script>

{#snippet titleInput()}
	<input
		type="text"
		bind:value={todo.title}
		placeholder="Todo title (required)"
		class="w-full rounded border border-tertiary bg-secondary p-2 text-sm text-text-primary placeholder-text-secondary focus:ring-1 focus:ring-accent focus:outline-none sm:text-base"
		required
	/>
{/snippet}

{#snippet descriptionInput()}
	<textarea
		bind:value={todo.description}
		placeholder="Description (optional)"
		rows="2"
		class="w-full resize-none rounded border border-tertiary bg-secondary p-2 text-sm text-text-primary placeholder-text-secondary focus:ring-1 focus:ring-accent focus:outline-none sm:text-base"
	></textarea>
{/snippet}

{#snippet dateAndPriorityInputs()}
	<Grid cols={1} gap="gap-2 sm:gap-3" className="sm:grid-cols-2">
		<input
			type="date"
			bind:value={todo.dueDate}
			class="w-full rounded border border-tertiary bg-secondary p-2 text-sm text-text-primary focus:ring-1 focus:ring-accent focus:outline-none sm:text-base"
		/>

		<select
			bind:value={todo.priority}
			class="w-full rounded border border-tertiary bg-secondary p-2 text-sm text-text-primary focus:ring-1 focus:ring-accent focus:outline-none sm:text-base"
		>
			{#each priorityOptions as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</Grid>
{/snippet}

{#snippet actionButtons()}
	<Flex gap="gap-2" className="flex-col sm:flex-row">
		<button
			type="submit"
			class="flex-1 rounded bg-accent px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-text-secondary sm:px-4 sm:py-2 sm:text-base flex items-center justify-center gap-2"
		>
			{#if todo.id}
				<Save class="h-4 w-4" />
				<span>Save</span>
			{:else}
				<Plus class="h-4 w-4" />
				<span>Add Todo</span>
			{/if}
		</button>

		{#if showCancel}
			<button
				type="button"
				onclick={onCancel}
				class="flex-1 rounded border border-tertiary bg-secondary px-3 py-2 text-sm text-text-primary transition-colors hover:bg-tertiary sm:px-4 sm:py-2 sm:text-base flex items-center justify-center gap-2"
			>
				<X class="h-4 w-4" />
				<span>Cancel</span>
			</button>
		{/if}
	</Flex>
{/snippet}

<Box {variant} border="border border-tertiary">
	<form onsubmit={preventDefault(() => onSubmit({ ...todo }))}>
		<Stack spacing="space-y-3">
			{@render titleInput()}
			{@render descriptionInput()}
			{@render dateAndPriorityInputs()}
			{@render actionButtons()}
		</Stack>
	</form>
</Box>

<script>
	import {
		updateTodo,
		deleteTodo,
		toggleComplete,
		getPriorityColor,
		formatDate,
		isOverdue,
		Flex,
		Grow
	} from '$lib';
	import TodoForm from './TodoForm.svelte';

	let { item } = $props();

	let isEditing = $state(false);
	let editData = $state({ ...item });

	// Validation
	let isValid = $derived(item && item.id && item.title);

	// Actions
	const startEdit = () => (isEditing = true);
	const cancelEdit = () => {
		editData = { ...item };
		isEditing = false;
	};

	const saveEdit = (updated) => {
		if (!updated.title.trim()) return alert('Title is required');
		try {
			updateTodo(item.id, updated);
			isEditing = false;
		} catch (err) {
			console.error(err);
			alert('Failed to update todo. Please try again.');
		}
	};

	const handleToggle = () => toggleComplete(item.id);

	const handleDelete = () => {
		if (confirm('Delete this todo?')) deleteTodo(item.id);
	};

	// Common classes (removed unused variable)
</script>

{#if !isValid}
	<div class="rounded-lg border border-red-500 bg-tertiary p-3">
		<p class="text-sm text-red-400">Invalid todo item</p>
	</div>
{:else if isEditing}
	<TodoForm todo={editData} onSubmit={saveEdit} onCancel={cancelEdit} variant="tertiary" />
{:else}
	<!-- View Mode -->
	<div
		class="group rounded-lg bg-todo-item transition-all duration-200 active:brightness-110 sm:hover:brightness-110"
	>
		<Flex align="items-start" gap="gap-3" className="p-2 sm:p-3">
			<!-- Checkbox -->
			<button
				onclick={handleToggle}
				class="flex-shrink-0 pt-1"
				aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
			>
				<div
					class={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ${
						item.completed
							? 'border-accent bg-accent'
							: 'border-border bg-secondary active:border-accent sm:hover:border-accent'
					}`}
				>
					{#if item.completed}
						<svg class="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					{/if}
				</div>
			</button>

			<!-- Content -->
			<Grow>
				<Flex align="items-start" justify="justify-between">
					<Grow>
						<h3
							class={`text-sm font-medium sm:text-base ${item.completed ? 'text-text-secondary line-through' : 'text-text-primary'}`}
						>
							{item.title}
						</h3>

						{#if item.description}
							<p
								class={`mt-1 text-xs sm:text-sm ${item.completed ? 'text-text-secondary line-through opacity-70' : 'text-text-secondary'}`}
							>
								{item.description}
							</p>
						{/if}

						<Flex align="items-center" gap="gap-2 sm:gap-3" className="mt-1 sm:mt-2 text-xs">
							<span class={`font-medium ${getPriorityColor(item.priority)}`}>
								{item.priority.toUpperCase()}
							</span>

							{#if item.dueDate}
								<span
									class={`${isOverdue(item.dueDate, item.completed) ? 'font-medium text-red-400' : 'text-text-secondary'}`}
								>
									{formatDate(item.dueDate)}
									{#if isOverdue(item.dueDate, item.completed)}
										(Overdue!){/if}
								</span>
							{/if}
						</Flex>
					</Grow>

					<!-- Actions -->
					<Flex
						gap="gap-1"
						className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
					>
						<button
							onclick={startEdit}
							class="rounded bg-tertiary px-2 py-1 text-xs text-accent transition-colors active:bg-accent active:text-primary sm:hover:bg-accent sm:hover:text-primary"
							title="Edit todo"
						>
							Edit
						</button>
						<button
							onclick={handleDelete}
							class="rounded bg-red-900 px-2 py-1 text-xs text-red-400 transition-colors active:bg-red-800 sm:hover:bg-red-800"
							title="Delete todo"
						>
							Delete
						</button>
					</Flex>
				</Flex>
			</Grow>
		</Flex>
	</div>
{/if}

<script>
	import { addTodo } from '$lib';
	import TodoForm from './TodoForm.svelte';

	let showForm = false;
	let newTodo = { title: '', description: '', dueDate: '', priority: 'medium' };

	function handleAdd(todo) {
		addTodo(todo);
		resetForm();
	}

	function resetForm() {
		newTodo = { title: '', description: '', dueDate: '', priority: 'medium' };
		showForm = false;
	}
</script>

{#if !showForm}
	<button
		on:click={() => (showForm = true)}
		class="w-full rounded-lg border-2 border-dashed border-tertiary p-2 text-sm text-text-secondary transition-colors active:border-accent active:text-accent sm:p-3 sm:text-base sm:hover:border-accent sm:hover:text-accent"
	>
		+ Add New Task
	</button>
{:else}
	<TodoForm todo={newTodo} onSubmit={handleAdd} onCancel={resetForm} variant="primary" />
{/if}

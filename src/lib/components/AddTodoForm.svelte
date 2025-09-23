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
		class="w-full rounded-lg border-2 border-dashed border-tertiary p-3 text-text-secondary transition-colors hover:border-accent hover:text-accent"
	>
		+ Add New Task
	</button>
{:else}
	<TodoForm todo={newTodo} onSubmit={handleAdd} onCancel={resetForm} variant="primary" />
{/if}

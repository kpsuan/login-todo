<script>
	import { addTodo, PRIORITY_LEVELS } from '$lib';
	import { Plus } from 'lucide-svelte';
	import TodoForm from './TodoForm.svelte';

	let showForm = $state(false);
	let newTodo = $state({ title: '', description: '', dueDate: '', priority: PRIORITY_LEVELS.MEDIUM });

	function handleAdd(todo) {
		addTodo(todo);
		resetForm();
	}

	function resetForm() {
		newTodo = { title: '', description: '', dueDate: '', priority: PRIORITY_LEVELS.MEDIUM };
		showForm = false;
	}
</script>

{#if !showForm}
	<button
		onclick={() => (showForm = true)}
		class="w-full rounded-lg border-2 border-dashed border-tertiary p-2 text-sm text-text-secondary transition-colors active:border-accent active:text-accent sm:p-3 sm:text-base sm:hover:border-accent sm:hover:text-accent flex items-center justify-center gap-2"
	>
		<Plus class="h-4 w-4" />
		<span>Add New Task</span>
	</button>
{:else}
	<TodoForm todo={newTodo} onSubmit={handleAdd} onCancel={resetForm} variant="primary" />
{/if}

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
    on:click={() => showForm = true}
    class="w-full p-3 border-2 border-dashed border-tertiary rounded-lg text-text-secondary hover:border-accent hover:text-accent transition-colors"
  >
    + Add New Task
  </button>
{:else}
  <TodoForm
    todo={newTodo}
    onSubmit={handleAdd}
    onCancel={resetForm}
    variant="primary"
  />
{/if}

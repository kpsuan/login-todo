<script>
  import { updateTodo, deleteTodo, toggleComplete, getPriorityColor, formatDate, isOverdue, Flex, Grow } from '$lib';
  import TodoForm from './TodoForm.svelte';

  export let item;

  let isEditing = false;
  let editData = { ...item };

  // Validation
  $: isValid = item && item.id && item.title;

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

  // Common classes
  const inputClasses =
    "w-full p-2 bg-input-bg border border-input-border rounded text-sm text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none";
</script>

{#if !isValid}
  <div class="p-3 border border-red-500 rounded-lg bg-tertiary">
    <p class="text-red-400 text-sm">Invalid todo item</p>
  </div>

{:else if isEditing}
  <TodoForm
    todo={editData}
    onSubmit={saveEdit}
    onCancel={cancelEdit}
    variant="tertiary"
  />

{:else}
  <!-- View Mode -->
  <div class="group rounded-lg transition-all duration-200 hover:brightness-110 bg-todo-item">
    <Flex align="items-start" gap="gap-3" className="p-3">

      <!-- Checkbox -->
      <button
        on:click={handleToggle}
        class="flex-shrink-0 pt-1"
        aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <div class={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          item.completed
            ? 'bg-accent border-accent'
            : 'bg-secondary border-border hover:border-accent'
        }`}>
          {#if item.completed}
            <svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          {/if}
        </div>
      </button>

      <!-- Content -->
      <Grow>
        <Flex align="items-start" justify="justify-between">
          <Grow>
            <h3 class={`font-medium ${item.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
              {item.title}
            </h3>

            {#if item.description}
              <p class={`text-sm mt-1 ${item.completed ? 'line-through text-text-secondary opacity-70' : 'text-text-secondary'}`}>
                {item.description}
              </p>
            {/if}

            <Flex align="items-center" gap="gap-3" className="mt-2 text-xs">
              <span class={`font-medium ${getPriorityColor(item.priority)}`}>
                {item.priority.toUpperCase()}
              </span>

              {#if item.dueDate}
                <span class={`${isOverdue(item.dueDate, item.completed) ? 'text-red-400 font-medium' : 'text-text-secondary'}`}>
                  {formatDate(item.dueDate)}
                  {#if isOverdue(item.dueDate, item.completed)} (Overdue!){/if}
                </span>
              {/if}
            </Flex>
          </Grow>

          <!-- Actions -->
          <Flex gap="gap-1" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              on:click={startEdit}
              class="px-2 py-1 text-xs bg-tertiary text-accent rounded hover:bg-accent hover:text-primary transition-colors"
            >
              Edit
            </button>
            <button
              on:click={handleDelete}
              class="px-2 py-1 text-xs bg-red-900 text-red-400 rounded hover:bg-red-800 transition-colors"
            >
              Delete
            </button>
          </Flex>
        </Flex>
      </Grow>
    </Flex>
  </div>
{/if}

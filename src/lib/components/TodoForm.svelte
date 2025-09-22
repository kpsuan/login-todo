<script>
  import { Stack, Flex, Grid, Box, priorityOptions } from '$lib';

  export let todo = { title: '', description: '', dueDate: '', priority: 'medium' };
  export let onSubmit = () => {};
  export let onCancel = () => {};
  export let variant = 'primary'; // Box variant
  export let showCancel = true; // show cancel button
</script>

<Box variant={variant} border="border border-tertiary">
  <form on:submit|preventDefault={() => onSubmit({ ...todo })}>
    <Stack spacing="space-y-3">
      <input
        type="text"
        bind:value={todo.title}
        placeholder="Todo title (required)"
        class="w-full p-2 bg-secondary border border-tertiary rounded text-text-primary placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-accent"
        required
      />

      <textarea
        bind:value={todo.description}
        placeholder="Description (optional)"
        rows="2"
        class="w-full p-2 bg-secondary border border-tertiary rounded text-text-primary placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-accent resize-none"
      ></textarea>

      <Grid cols={2} gap="gap-3">
        <input
          type="date"
          bind:value={todo.dueDate}
          class="w-full p-2 bg-secondary border border-tertiary rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
        />

        <select
          bind:value={todo.priority}
          class="w-full p-2 bg-secondary border border-tertiary rounded text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {#each priorityOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </Grid>

      <Flex gap="gap-2">
        <button
          type="submit"
          class="flex-1 bg-accent text-primary py-2 px-4 rounded hover:bg-text-secondary transition-colors font-medium"
        >
          {todo.id ? 'Save Changes' : 'Add Todo'}
        </button>

        {#if showCancel}
          <button
            type="button"
            on:click={onCancel}
            class="flex-1 bg-secondary border border-tertiary text-text-primary py-2 px-4 rounded hover:bg-tertiary transition-colors"
          >
            Cancel
          </button>
        {/if}
      </Flex>
    </Stack>
  </form>
</Box>

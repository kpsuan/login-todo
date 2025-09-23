// Main library exports
export { default as List } from './components/List.svelte';
export { default as ListItem } from './components/ListItem.svelte';
export { default as AddTodoForm } from './components/AddTodoForm.svelte';

// Utility components
export { default as Container } from './components/ui/Container.svelte';
export { default as Flex } from './components/ui/Flex.svelte';
export { default as Grow } from './components/ui/Grow.svelte';
export { default as Section } from './components/ui/Section.svelte';
export { default as Box } from './components/ui/Box.svelte';
export { default as Stack } from './components/ui/Stack.svelte';
export { default as Grid } from './components/ui/Grid.svelte';

// Store exports
export {
	todoState,
	stats,
	sortedItems,
	filteredItems,
	filter,
	addTodo,
	updateTodo,
	deleteTodo,
	toggleComplete,
	setFilter
} from './store/todoStore.svelte.js';

// Utility functions
export { getPriorityColor, formatDate, isOverdue, priorityOptions } from './utils.js';

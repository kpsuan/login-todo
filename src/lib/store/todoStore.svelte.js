const APP_NAME = 'todo_app_2025';
const IS_BROWSER = typeof window !== 'undefined';

// Constants
const PRIORITY_LEVELS = {
	HIGH: 'high',
	MEDIUM: 'medium',
	LOW: 'low'
};

const FILTER_TYPES = {
	ALL: 'all',
	ACTIVE: 'active',
	COMPLETED: 'completed'
};

const PRIORITY_ORDER = { 
	[PRIORITY_LEVELS.HIGH]: 0, 
	[PRIORITY_LEVELS.MEDIUM]: 1, 
	[PRIORITY_LEVELS.LOW]: 2 
};

const _default = {
	date_created: Date.now(),
	date_updated: Date.now(),
	items: [
		{
			id: 'demo-1',
			title: 'Welcome to your todo app',
			description: 'This is a sample todo description',
			dueDate: new Date().toISOString().split('T')[0],
			priority: PRIORITY_LEVELS.MEDIUM,
			completed: false,
			date_added: Date.now(),
			date_updated: Date.now(),
			date_deleted: null
		}
	],
	trash: []
};

function load() {
	try {
		if (IS_BROWSER && localStorage) {
			return JSON.parse(localStorage.getItem(APP_NAME)) || _default;
		}
		return _default;
	} catch {
		return _default;
	}
}

function save(state) {
	if (IS_BROWSER && localStorage) {
		try {
			localStorage.setItem(APP_NAME, JSON.stringify(state));
		} catch {
			// Silently fail if localStorage is not available or full
		}
	}
}

export const todoState = $state({
	app: load(),
	filter: FILTER_TYPES.ALL
});

// Helper functions for sorting
const sortByCompletionStatus = (a, b) => a.completed !== b.completed ? (a.completed ? 1 : -1) : 0;
const sortByPriority = (a, b) => {
	const aPriority = PRIORITY_ORDER[a.priority] ?? 1;
	const bPriority = PRIORITY_ORDER[b.priority] ?? 1;
	return aPriority - bPriority;
};
const sortByDate = (a, b) => a.completed ? a.date_added - b.date_added : b.date_added - a.date_added;

const _stats = $derived.by(() => {
	const total = todoState.app.items.length;
	const completed = todoState.app.items.filter(item => item.completed).length;
	return {
		total,
		completed,
		pending: total - completed
	};
});

const _sortedItems = $derived(
	[...todoState.app.items].sort((a, b) => {
		return sortByCompletionStatus(a, b) || sortByPriority(a, b) || sortByDate(a, b);
	})
);

const _filteredItems = $derived.by(() => {
	const sorted = _sortedItems;
	switch (todoState.filter) {
		case FILTER_TYPES.ACTIVE:
			return sorted.filter(todo => !todo.completed);
		case FILTER_TYPES.COMPLETED:
			return sorted.filter(todo => todo.completed);
		default:
			return sorted;
	}
});

const _filter = $derived(todoState.filter);

export const stats = () => _stats;
export const sortedItems = () => _sortedItems;
export const filteredItems = () => _filteredItems;
export const filter = () => _filter;

// CRUD actions
export function addTodo(todoData) {
	const newTodo = {
		id: `todo_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
		title: todoData.title || 'Untitled',
		description: todoData.description || '',
		dueDate: todoData.dueDate || '',
		priority: todoData.priority || PRIORITY_LEVELS.MEDIUM,
		completed: false,
		date_added: Date.now(),
		date_updated: Date.now(),
		date_deleted: null
	};

	todoState.app.date_updated = Date.now();
	todoState.app.items.push(newTodo);
	save(todoState.app);
}

export function updateTodo(id, updates) {
	const item = todoState.app.items.find((item) => item.id === id);
	if (item) {
		Object.assign(item, updates, { date_updated: Date.now() });
		todoState.app.date_updated = Date.now();
		save(todoState.app);
	}
}

export function deleteTodo(id) {
	const itemIndex = todoState.app.items.findIndex((i) => i.id === id);
	if (itemIndex !== -1) {
		const item = todoState.app.items[itemIndex];
		todoState.app.date_updated = Date.now();
		todoState.app.items.splice(itemIndex, 1);
		todoState.app.trash.push({ ...item, date_deleted: Date.now() });
		save(todoState.app);
	}
}

export function toggleComplete(id) {
	const item = todoState.app.items.find((item) => item.id === id);
	if (item) {
		item.completed = !item.completed;
		item.date_updated = Date.now();
		todoState.app.date_updated = Date.now();
		save(todoState.app);
	}
}

export function setFilter(value) {
	todoState.filter = value;
}

// Export constants for use in other components
export { PRIORITY_LEVELS, FILTER_TYPES };

const APP_NAME = 'todo_app_2025';
const IS_BROWSER = typeof window !== 'undefined';

const _default = {
	date_created: Date.now(),
	date_updated: Date.now(),
	items: [
		{
			id: 'demo-1',
			title: 'Welcome to your todo app',
			description: 'This is a sample todo description',
			dueDate: new Date().toISOString().split('T')[0],
			priority: 'medium',
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
	filter: 'all'
});

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

const _stats = $derived({
	total: todoState.app.items.length,
	completed: todoState.app.items.filter((item) => item.completed).length,
	pending: todoState.app.items.length - todoState.app.items.filter((item) => item.completed).length
});

const _sortedItems = $derived(
	[...todoState.app.items].sort((a, b) => {
		// completion status (incomplete first, completed last)
		if (a.completed !== b.completed) {
			return a.completed ? 1 : -1;
		}

		// priority order (high = 0, medium = 1, low = 2)
		const aPriority = PRIORITY_ORDER[a.priority] ?? 1;
		const bPriority = PRIORITY_ORDER[b.priority] ?? 1;

		if (aPriority !== bPriority) {
			return aPriority - bPriority;
		}

		// order by date (completed = old first, pending = new first)
		if (a.completed) {
			return a.date_added - b.date_added;
		} else {
			return b.date_added - a.date_added;
		}
	})
);

const _filteredItems = $derived.by(() => {
	const sorted = _sortedItems;
	switch (todoState.filter) {
		case 'active':
			return sorted.filter((todo) => !todo.completed);
		case 'completed':
			return sorted.filter((todo) => todo.completed);
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
		priority: todoData.priority || 'medium',
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

import { writable, derived } from "svelte/store";

const app_name = "todo_app_2025";
const hasLocalStorage = typeof localStorage !== 'undefined';

const _default = {
	date_created: Date.now(),
	date_updated: Date.now(),
	items: [{
		id: "demo-1",
		title: "Welcome to your todo app",
		description: "This is a sample todo description",
		dueDate: new Date().toISOString().split('T')[0],
		priority: "medium",
		completed: false,
		date_added: Date.now(),
		date_updated: Date.now(),
		date_deleted: null,
	}],
	trash: []
};

function load() {
	try {
		if (!hasLocalStorage) return _default;
		return JSON.parse(localStorage.getItem(app_name)) || _default;
	} catch {
		return _default;
	}
}

function save(state) {
	if (!hasLocalStorage) return;
	try {
		localStorage.setItem(app_name, JSON.stringify(state));
	} catch {}
}

const store = writable(load());

store.subscribe((value) => {
	save(value);
});

export const app = store;

// Sort items by completion, then priority, then date
export const sortedItems = derived(app, ($app) =>
	[...$app.items].sort((a, b) => {
		// completion status (incomplete first, completed last)
		if (a.completed !== b.completed) {
			return a.completed ? 1 : -1;
		}

		// priority order (high = 0, medium = 1, low = 2)
		const priorityOrder = { high: 0, medium: 1, low: 2 };
		const aPriority = priorityOrder[a.priority] ?? 1;
		const bPriority = priorityOrder[b.priority] ?? 1;

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

// Stats store (total, pending, completed)
export const stats = derived(app, ($app) => {
	const total = $app.items.length;
	const completed = $app.items.filter((item) => item.completed).length;
	const pending = total - completed;

	return { total, pending, completed };
});


// crud actionss
export function addTodo(todoData) {
	app.update((state) => {
		const newTodo = {
			id: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			title: todoData.title || "Untitled",
			description: todoData.description || "",
			dueDate: todoData.dueDate || "",
			priority: todoData.priority || "medium",
			completed: false,
			date_added: Date.now(),
			date_updated: Date.now(),
			date_deleted: null,
		};
		return {
			...state,
			date_updated: Date.now(),
			items: [...state.items, newTodo],
		};
	});
}

export function updateTodo(id, updates) {
	app.update((state) => {
		const items = state.items.map((item) =>
			item.id === id
				? { ...item, ...updates, date_updated: Date.now() }
				: item
		);
		return { ...state, date_updated: Date.now(), items };
	});
}

export function deleteTodo(id) {
	app.update((state) => {
		const item = state.items.find((i) => i.id === id);
		if (!item) return state;
		return {
			...state,
			date_updated: Date.now(),
			items: state.items.filter((i) => i.id !== id),
			trash: [...state.trash, { ...item, date_deleted: Date.now() }],
		};
	});
}

export function toggleComplete(id) {
	app.update((state) => {
		const items = state.items.map((item) =>
			item.id === id
				? {
						...item,
						completed: !item.completed,
						date_updated: Date.now(),
				  }
				: item
		);
		return { ...state, date_updated: Date.now(), items };
	});
}

export const filter = writable('all');

export const filteredItems = derived(
  [sortedItems, filter],
  ([$sortedItems, $filter]) => {
    switch ($filter) {
      case 'active':
        return $sortedItems.filter(todo => !todo.completed);
      case 'completed':
        return $sortedItems.filter(todo => todo.completed);
      default:
        return $sortedItems;
    }
  }
);

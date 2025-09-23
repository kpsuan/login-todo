/**
 * Todo Collection API Endpoint
 *
 * Handles operations on the entire collection of todos:
 * - GET /api/todos - List all todos with optional filtering
 * - POST /api/todos - Create a new todo
 */

import { json } from '@sveltejs/kit';
import { todos } from '$lib/todos.js';


export async function GET({ locals, url }) {
	// Check authentication - user must be logged in
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const filter = url.searchParams.get('filter') || 'all';
	let filteredTodos = todos;

	// Apply filtering based on completion status
	switch (filter) {
		case 'active':
			filteredTodos = todos.filter((todo) => !todo.completed);
			break;
		case 'completed':
			filteredTodos = todos.filter((todo) => todo.completed);
			break;
		default:
			filteredTodos = todos; // 'all' or any other value
	}

	// Return filtered todos with stats and user info
	return json({
		items: filteredTodos,
		stats: {
			total: todos.length,
			completed: todos.filter((t) => t.completed).length,
			pending: todos.filter((t) => !t.completed).length
		},
		user: { id: locals.user.data?.id, username: locals.user.data?.username }
	});
}

/**
 * Creates a new todo from JSON body.
 * Required: { title: "string" }
 * Optional: { description, dueDate, priority }
 *
 * Returns the created todo with generated ID and timestamps
 */
export async function POST({ locals, request }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const body = await request.json().catch(() => null);
	if (!body || !body.title?.trim()) {
		return json({ error: 'Title is required' }, { status: 400 });
	}

	// Create new todo with generated ID and current timestamp
	const newTodo = {
		id: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
		title: body.title.trim(),
		description: body.description || '',
		dueDate: body.dueDate || '',
		priority: body.priority || 'medium',
		completed: false,
		date_added: Date.now(),
		date_updated: Date.now(),
		userId: locals.user.data?.id
	};

	todos.push(newTodo);
	return json(newTodo, { status: 201 });
}

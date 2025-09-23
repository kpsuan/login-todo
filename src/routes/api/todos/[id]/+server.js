/**
 * Individual Todo API Endpoint
 * Handles operations on a specific todo by ID:
 * - GET /api/todos/[id] - Get a specific todo
 * - PATCH /api/todos/[id] - Update a specific todo (partial update)
 * - DELETE /api/todos/[id] - Delete a specific todo
 */

import { json } from '@sveltejs/kit';
import { todos } from '$lib/todos.js';

// Returns a specific todo by ID.
export async function GET({ locals, params }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const todo = todos.find((t) => t.id === params.id);
	if (!todo) {
		return json({ error: 'Todo not found' }, { status: 404 });
	}

	return json(todo);
}

//Updates a specific todo with partial data from JSON body.

export async function PATCH({ locals, params, request }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const todoIndex = todos.findIndex((t) => t.id === params.id);
	if (todoIndex === -1) {
		return json({ error: 'Todo not found' }, { status: 404 });
	}

	const body = await request.json().catch(() => null);
	if (!body) {
		return json({ error: 'Invalid request body' }, { status: 400 });
	}

	if (body.title !== undefined && !body.title.trim()) {
		return json({ error: 'Title cannot be empty' }, { status: 400 });
	}

	const updatedTodo = {
		...todos[todoIndex],
		...body,
		date_updated: Date.now()
	};

	todos[todoIndex] = updatedTodo;

	return json(updatedTodo);
}

//Deletes a specific todo by ID.

export async function DELETE({ locals, params }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const todoIndex = todos.findIndex((t) => t.id === params.id);
	if (todoIndex === -1) {
		return json({ error: 'Todo not found' }, { status: 404 });
	}

	const deletedTodo = todos.splice(todoIndex, 1)[0];

	return json({ success: true, deleted: deletedTodo });
}

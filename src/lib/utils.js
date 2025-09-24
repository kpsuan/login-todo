// Todo utility functions
import { PRIORITY_LEVELS } from './store/todoStore.svelte.js';

export function getPriorityColor(priority) {
	const colors = {
		[PRIORITY_LEVELS.HIGH]: 'text-red-600',
		[PRIORITY_LEVELS.MEDIUM]: 'text-yellow-600',
		[PRIORITY_LEVELS.LOW]: 'text-green-600'
	};
	return colors[priority] || 'text-gray-600';
}

export function formatDate(dateString) {
	if (!dateString) return '';
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});
}

export function isOverdue(dueDate, isCompleted = false) {
	if (!dueDate || isCompleted) return false;

	const today = new Date();
	const due = new Date(dueDate);
	today.setHours(0, 0, 0, 0);
	due.setHours(0, 0, 0, 0);

	return due < today;
}

export const priorityOptions = [
	{ value: PRIORITY_LEVELS.LOW, label: 'Low' },
	{ value: PRIORITY_LEVELS.MEDIUM, label: 'Medium' },
	{ value: PRIORITY_LEVELS.HIGH, label: 'High' }
];

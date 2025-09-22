// Todo utility functions

export function getPriorityColor(priority) {
	const colors = {
		high: 'text-red-600',
		medium: 'text-yellow-600',
		low: 'text-green-600'
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
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' }
];

// UI class presets
// (login page class presets moved back to the page)
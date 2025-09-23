// Simple shared todos array for demo purposes
export let todos = [
	{
		id: 'demo-1',
		title: 'Welcome to your todo app',
		description: 'This is a sample todo description',
		dueDate: new Date().toISOString().split('T')[0],
		priority: 'medium',
		completed: false,
		date_added: Date.now(),
		date_updated: Date.now(),
		userId: null
	}
];
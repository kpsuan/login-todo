// Client-side error handling hook

/** @type {import('@sveltejs/kit').HandleClientError} */
export function handleError({ error, event, status, message }) {
	// Log errors for debugging
	console.error('Client error:', {
		error,
		status,
		message,
		url: event?.url?.pathname,
		timestamp: new Date().toISOString()
	});

	// Return a user-friendly message
	const userMessage = status === 404 ? 'Page not found' : 'Something went wrong. Please try again.';

	return {
		message: userMessage,
		errorId: `error-${Date.now()}`
	};
}

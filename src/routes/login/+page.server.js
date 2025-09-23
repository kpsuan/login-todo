import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, fetch }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		try {
			// Call internal API endpoint - handle all validation
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const data = await res.json();

			if (!res.ok) {
				return fail(res.status, { error: data.error || 'Login failed' });
			}
		} catch (err) {
			if (err?.status >= 300 && err?.status < 400) {
				throw err;
			}
			console.error('Login action error:', err);
			return fail(500, { error: 'Login failed. Please try again.' });
		}

		// Redirect after successful login (outside try/catch)
		throw redirect(303, '/todo');
	}
};

// Prevent logged-in users from accessing login page
export function load({ cookies }) {
	const token = cookies.get('accessToken');
	if (token) throw redirect(303, '/todo');
	return {};
}

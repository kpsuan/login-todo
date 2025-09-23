import { fail, redirect } from '@sveltejs/kit';

const API_URL = 'https://dummyjson.com/auth/login';

/** Actions */
export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		// Validation
		if (!username || !password) {
			return fail(400, { error: 'Please enter username and password' });
		}

		if (username.length < 3) {
			return fail(400, { error: 'Username must be at least 3 characters long' });
		}

		if (password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters long' });
		}

		try {
			const res = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password, expiresInMins: 60 })
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				return fail(400, { error: errorData.message || 'Incorrect username or password' });
			}

			const data = await res.json();

			// Store both token and user data in cookies
			cookies.set('accessToken', data.token || data.accessToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 // 1 hour
			});

			cookies.set(
				'userData',
				JSON.stringify({
					id: data.id,
					username: data.username,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					image: data.image
				}),
				{
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 60 * 60 // 1 hour
				}
			);
		} catch (err) {
			console.error('Login error:', err);
			return fail(500, { error: 'Login failed. Please try again.' });
		}

		// Redirect after successful login (outside try-catch)
		throw redirect(303, '/todo');
	}
};

// Prevent logged-in users from accessing login page
export function load({ cookies }) {
	const token = cookies.get('accessToken');
	if (token) throw redirect(303, '/todo');
	return {};
}

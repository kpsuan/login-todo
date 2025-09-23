import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

const EXTERNAL_API_URL = 'https://dummyjson.com/auth/login';

export const actions = {
	login: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!username || !password) {
			return fail(400, { error: 'Username and password are required' });
		}

		try {
			const res = await fetch(EXTERNAL_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					password,
					expiresInMins: 60
				})
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				return fail(400, { error: errorData.message || 'Incorrect username or password' });
			}

			const data = await res.json();

			// Store both token and user data in cookies
			const cookieOptions = {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev,
				maxAge: 60 * 60 // 1 hour
			};

			cookies.set('accessToken', data.token || data.accessToken, cookieOptions);

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
				cookieOptions
			);
		} catch (err) {
			console.error('Login error:', err);
			return fail(500, { error: 'Login failed. Please try again.' });
		}

		// Redirect after successful login
		throw redirect(303, '/todo');
	}
};

// Prevent logged-in users from accessing login page
export function load({ cookies }) {
	const token = cookies.get('accessToken');
	if (token) throw redirect(303, '/todo');
	return {};
}

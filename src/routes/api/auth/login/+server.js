import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';

const EXTERNAL_API_URL = 'https://dummyjson.com/auth/login';

export async function POST({ request, cookies, fetch }) {
	const body = await request.json().catch(() => null);

	if (!body || !body.username || !body.password) {
		return json({ error: 'Username and password are required' }, { status: 400 });
	}

	if (body.username.length < 3) {
		return json({ error: 'Username must be at least 3 characters long' }, { status: 400 });
	}

	if (body.password.length < 6) {
		return json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
	}

	try {
		const res = await fetch(EXTERNAL_API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: body.username,
				password: body.password,
				expiresInMins: 60
			})
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}));
			return json(
				{
					error: errorData.message || 'Incorrect username or password'
				},
				{ status: 400 }
			);
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

		return json({
			success: true,
			user: {
				id: data.id,
				username: data.username,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				image: data.image
			}
		});
	} catch (err) {
		console.error('Login error:', err);
		return json({ error: 'Login failed. Please try again.' }, { status: 500 });
	}
}

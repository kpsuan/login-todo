import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.user) throw redirect(303, '/login');
	return {
		token: locals.user.token,
		userData: locals.user.data ?? null
	};
}

export const actions = {
	logout: async ({ cookies }) => {
		// Clear authentication cookies
		const options = { path: '/', httpOnly: true, sameSite: 'strict' };
		cookies.delete('accessToken', options);
		cookies.delete('userData', options);

		throw redirect(303, '/login');
	}
};

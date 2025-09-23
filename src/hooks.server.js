/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const token = event.cookies.get('accessToken');
	const userDataCookie = event.cookies.get('userData');

	let userData = null;
	if (userDataCookie) {
		try {
			userData = JSON.parse(userDataCookie);
		} catch {
			console.warn('Invalid userData cookie JSON');
		}
	}

	event.locals.user = token
		? {
				token,
				data: userData
			}
		: null;

	const response = await resolve(event);
	return response;
}

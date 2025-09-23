export function load({ locals, url }) {
	const isLoggedIn = !!locals.user;
	const userData = locals.user?.data ?? null;
	return {
		isLoggedIn,
		userData,
		currentPath: url.pathname
	};
}

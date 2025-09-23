// User authentication store 
export const userState = $state({
	isLoggedIn: false,
	token: null,
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	image: ''
});

export const user = () => userState;
export const isLoggedIn = () => userState.isLoggedIn;

// Actions
export function setUser(data) {
	userState.isLoggedIn = true;
	userState.token = data.accessToken || data.token || '';
	userState.username = data.username || '';
	userState.firstName = data.firstName || '';
	userState.lastName = data.lastName || '';
	userState.email = data.email || '';
	userState.image = data.image || '';
}

export function logout() {
	userState.isLoggedIn = false;
	userState.token = null;
	userState.username = '';
	userState.firstName = '';
	userState.lastName = '';
	userState.email = '';
	userState.image = '';
}

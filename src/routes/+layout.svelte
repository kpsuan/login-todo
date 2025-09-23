<script>
	import '../app.css';
	import { Container, Box } from '$lib';
	import { setUser } from '$lib/store/userStore.js';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.isLoggedIn && data.userData) {
			setUser({
				accessToken: 'logged-in',
				...data.userData
			});
		}
	});
</script>

<Box variant="primary" className="min-h-screen h-full w-full fixed inset-0 overflow-auto">
	<Container>
		<slot />
	</Container>
</Box>

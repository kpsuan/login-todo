<script>
	import '../app.css';
	import { Container, Box } from '$lib';
</script>

<Box variant="primary" className="min-h-screen h-full w-full fixed inset-0 overflow-auto">
	<Container>
		<slot />
	</Container>
</Box>

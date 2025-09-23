<script>
	import '../app.css';
	import { Container, Box } from '$lib';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<Box variant="primary" className="min-h-screen h-full w-full fixed inset-0 overflow-auto">
	<Container>
		{@render children?.()}
	</Container>
</Box>

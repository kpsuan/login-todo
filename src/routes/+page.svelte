<script>
	import '../app.css';
	import { stats, List, Container, Section, Box, Stack } from '$lib';
</script>

<Box variant="primary" className="min-h-screen h-full w-full fixed inset-0 overflow-auto">
	<Container>
		<Section variant="card">
			<Stack>
				<!-- header  -->
				<Box className="pb-2 mb-2 text-center">
					<img src="/src/assets/6.png" alt="Todo App Icon" class="w-64 h-48 mx-auto mb-2" />
					<h1 class="text-2xl font-bold text-text-primary">Fran's Todo App</h1>
					<p class="text-sm text-text-secondary mt-1">
						{#if $stats.total > 0}
							{$stats.pending} pending of {$stats.total} todos
						{:else}
							Get organized with your todo list!
						{/if}
					</p>
				</Box>
				<!-- Todo List  -->
				<List />
			</Stack>
		</Section>
	</Container>
</Box>

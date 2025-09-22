<script>
	import { stats, List, Section, Box, Stack, Flex } from '$lib';
	import { goto } from '$app/navigation';

	function handleLogout() {
		goto('/');
	}
</script>

<!-- Top Navbar (outside card) -->
<Box className="mb-4">
    <Flex className="items-center justify-between">
        <Flex className="items-center gap-2">
            <!-- Placeholder avatar -->
            <div class="w-8 h-8 rounded-full bg-[var(--color-accent)]/30 border border-[var(--color-border)]"></div>
            <span class="text-text-primary text-sm">Emily S.</span>
            <button class="px-3 py-1.5 rounded-md bg-[var(--color-tertiary)] text-white text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30" on:click={handleLogout}>
                Logout
            </button>
        </Flex>
    </Flex>
</Box>

<Section variant="card">
    <Stack>
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
        <List />
    </Stack>
</Section>

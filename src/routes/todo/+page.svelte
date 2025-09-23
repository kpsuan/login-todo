<script>
	import { stats, List, Section, Box, Stack, Flex } from '$lib';
	import { user, logout, setUser } from '$lib/store/userStore.js';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let data;

	// Sync user data from server with client store
	onMount(() => {
		if (data.userData && data.token) {
			setUser({
				accessToken: data.token,
				...data.userData
			});
		}
	});

	// Logout function
	function handleLogout() {
		logout();
		return true;
	}
</script>

<!-- Top Navbar (outside card) -->
<Box className="mb-4 px-2 sm:px-0">
	<Flex className="items-center justify-between">
		<Flex className="items-center gap-2">
			<!-- User avatar -->
			<img
				src={$user.image || 'https://via.placeholder.com/40'}
				alt="User Avatar"
				class="h-6 w-6 rounded-full border border-[var(--color-border)] sm:h-8 sm:w-8"
			/>
			<div class="flex flex-col">
				<span class="text-xs text-text-primary sm:text-sm">
					{$user.isLoggedIn ? `${$user.firstName} ${$user.lastName}` : 'Guest'}
				</span>
				{#if $user.isLoggedIn && $user.email}
					<span class="hidden text-xs text-text-secondary sm:block">
						{$user.email}
					</span>
				{/if}
			</div>
			{#if $user.isLoggedIn}
				<form
					method="POST"
					action="?/logout"
					use:enhance={() => {
						return async ({ update }) => {
							handleLogout();
							await update();
						};
					}}
				>
					<button
						type="submit"
						class="rounded-md bg-[var(--color-tertiary)] px-2 py-1 text-xs text-white hover:opacity-90 focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:outline-none sm:px-3 sm:py-1.5 sm:text-sm"
					>
						Logout
					</button>
				</form>
			{/if}
		</Flex>
	</Flex>
</Box>

<Section variant="card">
	<Stack>
		<Box className="pb-2 mb-2 text-center px-2 sm:px-0">
			<img src="/6.png" alt="Todo App Icon" class="mx-auto mb-2 h-32 w-48 sm:h-48 sm:w-64" />
			<h1 class="text-xl font-bold text-text-primary sm:text-2xl">
				{$user.isLoggedIn ? `${$user.firstName}'s Todo App` : 'Todo App'}
			</h1>
			<p class="mt-1 text-xs text-text-secondary sm:text-sm">
				{#if stats().total > 0}
					{stats().pending} pending of {stats().total} todos
				{:else}
					Get organized with your todo list!
				{/if}
			</p>
		</Box>
		<List />
	</Stack>
</Section>

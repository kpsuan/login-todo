<script>
    import { Section, Box, Stack, Flex } from '$lib';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let remember = false;
	let loading = false;
    let error = '';

    // UI class presets
    const inputClass = 'w-full px-4 text-text-primary py-3 bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20';
    const subtleLinkClass = 'text-[var(--color-accent)] text-sm hover:underline';
    const submitBtnClass = 'w-full bg-[var(--color-tertiary)] text-white font-bold py-3 rounded-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50';


	async function handleSubmit(event) {
		event.preventDefault();
		error = '';
		if (!username || !password) {
			error = 'Please enter username and password';
			return;
		}
		loading = true;
		await new Promise((r) => setTimeout(r, 300));
		goto('/todo');
	}
</script>

<Section variant="card">
	<Stack>
		<Box className="flex items-center justify-center">
			<Box className="w-full max-w-md">
				<!-- Logo -->
				<Box className="text-center mb-4">
					<img src="/src/assets/logo2.png" alt="Logo" class="h-40 mx-auto mb-4" />
				</Box>

				<h2 class="text-2xl font-bold text-text-primary mb-2 text-center">Welcome Back</h2>

				{#if error}
					<Box className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm text-center">{error}</Box>
				{/if}

				<form class="space-y-4" on:submit|preventDefault={handleSubmit} autocomplete="on" novalidate>
					<label for="username" class="block text-text-primary text-sm font-medium mb-2">Enter your username</label>
					<input id="username" name="username" type="text" bind:value={username} placeholder="Username" autocomplete="username" class={inputClass} />

					<label for="password" class="block text-text-primary text-sm font-medium mb-2">Enter your Password</label>
					<input id="password" name="password" type="password" bind:value={password} placeholder="Password" autocomplete="current-password" class={inputClass} />

					<Flex className="items-center justify-between">
						<label for="remember" class="flex items-center cursor-pointer group">
							<input id="remember" name="remember" type="checkbox" bind:checked={remember} class="w-4 h-4 text-[var(--color-accent)] bg-[var(--color-input-bg)] border-[var(--color-input-border)] rounded" />
							<span class="ml-3 text-text-secondary text-sm group-hover:text-text-primary transition-colors">Remember me</span>
						</label>
						<button type="button" class={subtleLinkClass}>Forgot password?</button>
					</Flex>

					<button type="submit" class={submitBtnClass} disabled={loading}>
						{#if loading}
							Logging in...
						{:else}
							Log In
						{/if}
					</button>

					<p class="text-center text-text-secondary">Don't have an account? <button type="button" class={subtleLinkClass}>Sign up now</button></p>
				</form>
			</Box>
		</Box>
	</Stack>
</Section>

<script>
	import { Section, Box, Stack } from '$lib';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let loading = $state(false);
	let username = $state('');
	let password = $state('');
	let clientErrors = $state({});

	// Get error from form action result
	let error = $derived($page.form?.error || '');

	// Client-side validation
	function validateForm() {
		clientErrors = {};

		if (!username.trim()) {
			clientErrors.username = 'Username is required';
		}

		if (!password) {
			clientErrors.password = 'Password is required';
		}

		return Object.keys(clientErrors).length === 0;
	}

	function handleSubmit() {
		return validateForm();
	}
</script>

{#snippet logoSection()}
	<Box className="text-center mb-4">
		<img src="/logo2.png" alt="Logo" class="mx-auto mb-4 h-32 sm:h-40" />
	</Box>
{/snippet}

{#snippet testCredentials()}
	<Box
		className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm text-center mb-4"
	>
		<p class="mb-1 font-medium">Test Credentials:</p>
		<p class="flex flex-col gap-1 sm:flex-row sm:justify-center sm:gap-2">
			<span>Username: <span class="font-mono">emilys</span></span>
			<span class="hidden sm:inline">|</span>
			<span>Password: <span class="font-mono">emilyspass</span></span>
		</p>
	</Box>
{/snippet}

{#snippet errorMessage()}
	{#if error}
		<Box
			className="bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm text-center"
		>{error}</Box>
	{/if}
{/snippet}

{#snippet usernameField()}
	<div>
		<label
			for="username"
			class="mb-2 block text-xs font-medium text-text-primary sm:text-sm">Username</label
		>
		<input
			id="username"
			name="username"
			type="text"
			placeholder="Username"
			autocomplete="username"
			bind:value={username}
			oninput={() => {
				if (clientErrors.username) validateForm();
			}}
			class="w-full rounded-lg border px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base {clientErrors.username
				? 'border-red-500'
				: ''}"
			required
		/>
		{#if clientErrors.username}
			<p class="mt-1 text-sm text-red-500">{clientErrors.username}</p>
		{/if}
	</div>
{/snippet}

{#snippet passwordField()}
	<div>
		<label
			for="password"
			class="mb-2 block text-xs font-medium text-text-primary sm:text-sm">Password</label
		>
		<input
			id="password"
			name="password"
			type="password"
			placeholder="Password"
			autocomplete="current-password"
			bind:value={password}
			oninput={() => {
				if (clientErrors.password) validateForm();
			}}
			class="w-full rounded-lg border px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base {clientErrors.password
				? 'border-red-500'
				: ''}"
			required
		/>
		{#if clientErrors.password}
			<p class="mt-1 text-sm text-red-500">{clientErrors.password}</p>
		{/if}
	</div>
{/snippet}

{#snippet submitButton()}
	<button
		type="submit"
		class="w-full rounded-lg bg-[var(--color-tertiary)] py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base flex items-center justify-center gap-2"
		disabled={loading ||
			Object.keys(clientErrors).length > 0 ||
			!username.trim() ||
			!password}
	>
		{#if loading}
			<div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
			<span>Logging in...</span>
		{:else}
			<span>Log In</span>
		{/if}
	</button>
{/snippet}

{#snippet validationHints()}
	<div class="space-y-1 text-xs text-text-secondary">
		<p>• Use test credentials above for demo</p>
	</div>
{/snippet}

<Section variant="card">
	<Stack>
		<Box className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<Box className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
				{@render logoSection()}
				{@render testCredentials()}
				{@render errorMessage()}

				<form
					method="POST"
					action="?/login"
					use:enhance={() => {
						if (!handleSubmit()) {
							return async () => {}; // Prevent submission if validation fails
						}
						loading = true;
						return async ({ update }) => {
							await update();
							loading = false;
						};
					}}
					class="space-y-3 sm:space-y-4"
				>
					{@render usernameField()}
					{@render passwordField()}
					{@render submitButton()}
					{@render validationHints()}
				</form>
			</Box>
		</Box>
	</Stack>
</Section>

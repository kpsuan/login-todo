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
		} else if (username.trim().length < 3) {
			clientErrors.username = 'Username must be at least 3 characters long';
		}

		if (!password) {
			clientErrors.password = 'Password is required';
		} else if (password.length < 6) {
			clientErrors.password = 'Password must be at least 6 characters long';
		}

		return Object.keys(clientErrors).length === 0;
	}

	function handleSubmit() {
		return validateForm();
	}
</script>

<Section variant="card">
	<Stack>
		<Box className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<Box className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
				<Box className="text-center mb-4">
					<img src="/logo2.png" alt="Logo" class="mx-auto mb-4 h-32 sm:h-40" />
				</Box>

				<!-- Test Credentials  -->
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

				{#if error}
					<Box
						className="bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm text-center"
						>{error}</Box
					>
				{/if}

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
							minlength="3"
						/>
						{#if clientErrors.username}
							<p class="mt-1 text-sm text-red-500">{clientErrors.username}</p>
						{/if}
					</div>

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
							minlength="6"
						/>
						{#if clientErrors.password}
							<p class="mt-1 text-sm text-red-500">{clientErrors.password}</p>
						{/if}
					</div>

					<button
						type="submit"
						class="w-full rounded-lg bg-[var(--color-tertiary)] py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
						disabled={loading ||
							Object.keys(clientErrors).length > 0 ||
							!username.trim() ||
							!password}
					>
						{#if loading}Logging in...{:else}Log In{/if}
					</button>

					<!-- Validation hints -->
					<div class="space-y-1 text-xs text-text-secondary">
						<p>• Username must be at least 3 characters</p>
						<p>• Password must be at least 6 characters</p>
					</div>
				</form>
			</Box>
		</Box>
	</Stack>
</Section>

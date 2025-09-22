<script>
    import { Section, Box, Stack, Flex } from '$lib';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    let loading = false;
    let username = '';
    let password = '';
    let clientErrors = {};

    // Get error from form action result
    $: error = $page.form?.error || '';

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
        <Box className="flex items-center justify-center">
            <Box className="w-full max-w-md">
                <Box className="text-center mb-4">
                <img src="/assets/logo2.png" alt="Logo" class="h-40 mx-auto mb-4" />
                </Box>

                <!-- Test Credentials Info -->
                <Box className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-3 rounded-lg text-sm text-center mb-4">
                    <p class="font-medium mb-1">Test Credentials:</p>
                    <p>Username: <span class="font-mono">emilys</span> | Password: <span class="font-mono">emilyspass</span></p>
                </Box>

                {#if error}
                    <Box className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm text-center">{error}</Box>
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
                    class="space-y-4"
                >
                    <div>
                        <label for="username" class="block text-text-primary text-sm font-medium mb-2">Username</label>
                        <input 
                            id="username" 
                            name="username" 
                            type="text" 
                            placeholder="Username" 
                            autocomplete="username" 
                            bind:value={username}
                            on:input={() => { if (clientErrors.username) validateForm(); }}
                            class="w-full px-4 py-3 border rounded-lg {clientErrors.username ? 'border-red-500' : ''}" 
                            required
                            minlength="3"
                        />
                        {#if clientErrors.username}
                            <p class="text-red-500 text-sm mt-1">{clientErrors.username}</p>
                        {/if}
                    </div>

                    <div>
                        <label for="password" class="block text-text-primary text-sm font-medium mb-2">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            autocomplete="current-password" 
                            bind:value={password}
                            on:input={() => { if (clientErrors.password) validateForm(); }}
                            class="w-full px-4 py-3 border rounded-lg {clientErrors.password ? 'border-red-500' : ''}" 
                            required
                            minlength="6"
                        />
                        {#if clientErrors.password}
                            <p class="text-red-500 text-sm mt-1">{clientErrors.password}</p>
                        {/if}
                    </div>

                    <button 
                        type="submit" 
                        class="w-full bg-[var(--color-tertiary)] text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled={loading || Object.keys(clientErrors).length > 0 || !username.trim() || !password}
                    >
                        {#if loading}Logging in...{:else}Log In{/if}
                    </button>

                    <!-- Validation hints -->
                    <div class="text-xs text-text-secondary space-y-1">
                        <p>• Username must be at least 3 characters</p>
                        <p>• Password must be at least 6 characters</p>
                    </div>
                </form>
            </Box>
        </Box>
    </Stack>
</Section>

<script>
    import '../app.css';
    import { Container, Box, Flex } from '$lib';
</script>

<Box variant="primary" className="min-h-screen h-full w-full fixed inset-0 overflow-auto">
    <Container>
        <Box className="py-4">
            <Flex className="items-center justify-between">
                <a href="/" class="text-lg font-semibold text-text-primary">Fran's App</a>
                <nav class="space-x-4">
                    <a href="/" class="text-text-secondary hover:text-text-primary">Login</a>
                    <a href="/todo" class="text-text-secondary hover:text-text-primary">Todo</a>
                </nav>
            </Flex>
        </Box>

        <slot />
    </Container>
</Box>

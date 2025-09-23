<script>
	export let maxWidth = 'max-w-sm sm:max-w-xl lg:max-w-2xl';
	export let padding = 'py-4 px-4 sm:py-8 sm:px-8';
	export let center = true;
</script>

<div class={`container mx-auto ${padding} ${maxWidth} ${center ? 'mx-auto' : ''}`}>
	<slot />
</div>

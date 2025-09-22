<script>
	export let maxWidth = 'max-w-xl';
	export let padding = 'py-8 px-8';
	export let center = true;
</script>

<div class={`container mx-auto ${padding} ${maxWidth} ${center ? 'mx-auto' : ''}`}>
	<slot />
</div>
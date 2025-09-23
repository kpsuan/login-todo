<script>
	export let spacing = 'space-y-4';
	export let className = '';
</script>

<div class={`${spacing} ${className}`}>
	<slot />
</div>

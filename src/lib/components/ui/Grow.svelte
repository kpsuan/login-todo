<script>
	export let grow = 1;
	export let shrink = 1;
	export let basis = 'auto';
	export let className = '';
</script>

<div
	class={`${grow === 1 ? 'flex-1' : grow === 0 ? 'flex-none' : `flex-grow-${grow}`} ${shrink === 0 ? 'flex-shrink-0' : ''} ${basis !== 'auto' ? `flex-${basis}` : ''} ${className}`}
>
	<slot />
</div>

<script>
	export let variant = 'default'; 
	export let padding = 'p-4';
	export let background = variant === 'header' ? 'bg-secondary' : variant === 'card' ? 'bg-secondary' : 'bg-transparent';

	export let rounded = variant === 'header' || variant === 'card' ? 'rounded-lg' : '';
	export let shadow = variant === 'header' || variant === 'card' ? 'shadow-sm' : '';
	export let className = '';
</script>

<section class={`${background} ${padding} ${rounded} ${shadow} ${className}`}>
	<slot />
</section>
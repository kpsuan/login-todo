<script>

	/**
	 * @typedef {Object} Props
	 * @property {string} [variant]
	 * @property {string} [padding]
	 * @property {any} [background]
	 * @property {any} [rounded]
	 * @property {any} [shadow]
	 * @property {string} [className]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		variant = 'default',
		padding = 'p-3 sm:p-4',
		background = variant === 'header' ? 'bg-secondary' : variant === 'card' ? 'bg-secondary' : 'bg-transparent',
		rounded = variant === 'header' || variant === 'card' ? 'rounded-lg' : '',
		shadow = variant === 'header' || variant === 'card' ? 'shadow-sm' : '',
		className = '',
		children
	} = $props();
</script>

<section class={`${background} ${padding} ${rounded} ${shadow} ${className}`}>
	{@render children?.()}
</section>

<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [maxWidth]
	 * @property {string} [padding]
	 * @property {boolean} [center]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		maxWidth = 'max-w-sm sm:max-w-xl lg:max-w-2xl',
		padding = 'py-4 px-4 sm:py-8 sm:px-8',
		center = true,
		children
	} = $props();
</script>

<div class={`container mx-auto ${padding} ${maxWidth} ${center ? 'mx-auto' : ''}`}>
	{@render children?.()}
</div>

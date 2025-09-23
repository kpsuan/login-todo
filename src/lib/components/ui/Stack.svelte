<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [spacing]
	 * @property {string} [className]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { spacing = 'space-y-4', className = '', children } = $props();
</script>

<div class={`${spacing} ${className}`}>
	{@render children?.()}
</div>

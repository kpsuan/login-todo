<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [direction]
	 * @property {string} [gap]
	 * @property {string} [align]
	 * @property {string} [justify]
	 * @property {boolean} [wrap]
	 * @property {string} [className]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		direction = 'row',
		gap = 'gap-4',
		align = 'items-start',
		justify = 'justify-start',
		wrap = false,
		className = '',
		children
	} = $props();
</script>

<div
	class={`flex ${direction === 'col' ? 'flex-col' : direction === 'row-reverse' ? 'flex-row-reverse' : direction === 'col-reverse' ? 'flex-col-reverse' : 'flex-row'} ${gap} ${align} ${justify} ${wrap ? 'flex-wrap' : ''} ${className}`}
>
	{@render children?.()}
</div>

<script>
	/**
	 * @typedef {Object} Props
	 * @property {number} [grow]
	 * @property {number} [shrink]
	 * @property {string} [basis]
	 * @property {string} [className]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		grow = 1,
		shrink = 1,
		basis = 'auto',
		className = '',
		children
	} = $props();
</script>

<div
	class={`${grow === 1 ? 'flex-1' : grow === 0 ? 'flex-none' : `flex-grow-${grow}`} ${shrink === 0 ? 'flex-shrink-0' : ''} ${basis !== 'auto' ? `flex-${basis}` : ''} ${className}`}
>
	{@render children?.()}
</div>

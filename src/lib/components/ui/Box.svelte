<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [variant]
	 * @property {string} [padding]
	 * @property {string} [margin]
	 * @property {string} [rounded]
	 * @property {string} [shadow]
	 * @property {string} [border]
	 * @property {string} [className]
	 * @property {import('svelte').Snippet} [children]
	 * @property {function} [onclick]
	 */

	/** @type {Props & { [key: string]: any }} */
	let {
		variant = 'default',
		padding = 'p-4',
		margin = '',
		rounded = 'rounded-lg',
		shadow = '',
		border = '',
		className = '',
		children,
		onclick,
		...rest
	} = $props();

	// background variants
	let background = $derived({
		default: 'bg-transparent',
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		tertiary: 'bg-tertiary',
		accent: 'bg-accent'
	}[variant]);

	let classes = $derived([rounded, shadow, margin, padding, border, background, className]
		.filter(Boolean)
		.join(' '));
</script>

<div {...rest} class={classes} {onclick}>
	{@render children?.()}
</div>

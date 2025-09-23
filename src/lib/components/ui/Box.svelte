<script>
	import { createEventDispatcher } from 'svelte';

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
		...rest
	} = $props();

	const dispatch = createEventDispatcher();

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

<div {...rest} class={classes} onclick={(e) => dispatch('click', e)}>
	{@render children?.()}
</div>

<script>
	import { createEventDispatcher } from 'svelte';

	export let variant = 'default';
	export let padding = 'p-4';
	export let margin = '';
	export let rounded = 'rounded-lg';
	export let shadow = '';
	export let border = '';
	export let className = '';

	const dispatch = createEventDispatcher();

	// background variants
	$: background = {
		default: 'bg-transparent',
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		tertiary: 'bg-tertiary',
		accent: 'bg-accent'
	}[variant];

	$: classes = [rounded, shadow, margin, padding, border, background, className]
		.filter(Boolean)
		.join(' ');
</script>

<div {...$$restProps} class={classes} on:click={(e) => dispatch('click', e)}>
	<slot />
</div>

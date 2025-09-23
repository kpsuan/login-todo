<script>
	export let direction = 'row';
	export let gap = 'gap-4';
	export let align = 'items-start';
	export let justify = 'justify-start';
	export let wrap = false;
	export let className = '';
</script>

<div
	class={`flex ${direction === 'col' ? 'flex-col' : direction === 'row-reverse' ? 'flex-row-reverse' : direction === 'col-reverse' ? 'flex-col-reverse' : 'flex-row'} ${gap} ${align} ${justify} ${wrap ? 'flex-wrap' : ''} ${className}`}
>
	<slot />
</div>

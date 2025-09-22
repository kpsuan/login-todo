<script>
	export let cols = 3; 
	export let gap = 'gap-4';
	export let className = '';
	
	$: gridCols = {
		1: 'grid-cols-1',
		2: 'grid-cols-2', 
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
		12: 'grid-cols-12'
	}[cols] || 'grid-cols-3';
</script>

<div class={`grid ${gridCols} ${gap} ${className}`}>
	<slot />
</div>
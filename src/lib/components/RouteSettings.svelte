<script lang="ts">
	import type { Route } from '$lib';
	import _ from 'lodash';
	import { colord, extend } from 'colord';
	import namesPlugin from 'colord/plugins/names';
	import { onMount } from 'svelte';

	extend([namesPlugin]);

	export let route: Route;

	$: lineColor = colord((route.style.paint?.['line-color'] || 'black') as string).toHex();

	$: showDrops = _(route.drops)
		.map((drop) => drop.style?.display !== 'none')
		.some();

	$: showLines = route.style.layout?.visibility !== 'none';

	// $: route &&
	// 	showDrops !== undefined &&
	// 	(() => {
	// 		route.drops.forEach(
	// 			(drop) => (drop.style = { ...drop.style, display: showDrops ? 'inline-block' : 'none' })
	// 		);
	// 		route = route;
	// 	})();
	//
	// $: route &&
	// 	showLines !== undefined &&
	// 	(() => {
	// 		route.style.layout = { ...route.style.layout, visibility: showLines ? 'visible' : 'none' };
	// 		route = route;
	// 	})();
</script>

<div class="flex flex-row">
	<input
		type="color"
		value={lineColor}
		on:change={({ target }) => {
			route.style.paint = { ...route.style.paint, 'line-color': target.value };
			console.log(route.style.paint);
			route = route;
		}}
	/>
	<input
		type="checkbox"
		checked={showDrops}
		on:change={(evt) => {
			route.drops.forEach((drop) => {
				drop.style['display'] = evt.target.checked ? 'inline-block' : 'none';
			});
			route = route;
		}}
	/>
	<input
		type="checkbox"
		checked={showLines}
		on:change={(evt) => {
			route.style.layout.visibility = evt.target.checked ? 'visible' : 'none';
			route = route;
		}}
	/>
</div>

<style>
</style>

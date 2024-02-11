<script lang="ts">
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { DefaultMarker, LineLayer, GeoJSON, MapLibre } from 'svelte-maplibre';
	import maplibregl from 'maplibre-gl';

	function createGeoJSONLayer(route) {
		return {
			type: 'Feature',
			properties: {
				name: 'test'
			},
			geometry: {
				type: 'Polygon',
				coordinates: [route]
			}
		};
	}

	function fit() {
		const bounds = _(routes)
			.flatten()
			.reduce((bounds, coords) => bounds.extend(coords), new maplibregl.LngLatBounds());
		map.fitBounds(bounds, {
			padding: 50,
			maxDuration: 1
		});
	}

	onMount(() => {
		fit();
	});

	// http://localhost:5173/51.575571,-0.0461452|51.5536944,-0.0714722|51.5784716,-0.0688443|51.5755379,-0.0311646|51.5671091,-0.0290189|51.5759113,-0.0485024

	let map: maplibregl.Map;
	export let data: PageData;

	$: routes = data.solution;
</script>

<MapLibre
	bind:map
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
	standardControls
>
	{#each routes as route}
		<GeoJSON data={createGeoJSONLayer(route)}>
			<LineLayer
				layout={{ 'line-cap': 'round', 'line-join': 'round' }}
				paint={{
					'line-width': 5,
					'line-dasharray': [5, 2],
					'line-color': '#008800',
					'line-opacity': 0.8
				}}
			></LineLayer>
		</GeoJSON>
		{#each route as drop}
			<DefaultMarker lngLat={drop}></DefaultMarker>
		{/each}
	{/each}
</MapLibre>

<style lang="scss">
</style>

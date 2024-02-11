<script lang="ts">
	import _ from 'lodash';
	import styleToCss from 'style-object-to-css-string';
	import { LineLayer, GeoJSON, MapLibre, Marker, Popup } from 'svelte-maplibre';
	import maplibregl from 'maplibre-gl';
	import type { Route, Solution, LngLat, Drop } from '$lib';

	function getColor(index: number): string {
		const colors = ['red', 'blue', 'green', 'brown', 'yellow', 'black', 'violet', 'pink'];
		return colors[index % colors.length];
	}

	function preprocessDrop(drop: Drop, index: number, route: Route): Drop {
		const style = _.cloneDeep(drop.style);
		style['background-color'] =
			style['background-color'] ?? route.style.paint?.['line-color'] ?? 'inherit';
		return { ...drop, style };
	}

	function preprocessRoute(route: Route, index: number): Route {
		// Process styling first
		const style = _.cloneDeep(route.style);
		style.paint['line-color'] = style.paint?.['line-color'] ?? getColor(index);
		const preprocessedRoute = {
			...route,
			style
		};

		// Preprocess drops with updated styling info
		preprocessedRoute.drops = route.drops.map((drop, index) =>
			preprocessDrop(drop, index, preprocessedRoute)
		);
		return preprocessedRoute;
	}

	function preprocessSolution(solution: Solution): Solution {
		return { routes: _.map(solution.routes, preprocessRoute) };
	}

	function createGeoJSONLayer(route: Route) {
		return {
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: route.drops.map(({ location: { lng, lat } }) => [lng, lat])
			}
		};
	}

	function fitMapView(drops: Drop[]) {
		const bounds = _(drops)
			.map('location')
			.flatten()
			.reduce((bounds, coords) => bounds.extend(coords), new maplibregl.LngLatBounds());

		map?.fitBounds(bounds, {
			padding: 50,
			maxDuration: 1
		});
	}

	// http://localhost:5173/51.575571,-0.0461452|51.5536944,-0.0714722|51.5784716,-0.0688443|51.5755379,-0.0311646|51.5671091,-0.0290189|51.5759113,-0.0485024
	let map: maplibregl.Map;
	export let solution: Solution;

	let preprocessedSolution: Solution;
	let routes: Route[];
	let drops: Drop[];
	$: preprocessedSolution = preprocessSolution(solution);
	$: routes = preprocessedSolution?.routes ?? [];
	$: drops = preprocessedSolution?.routes.flatMap((r) => r.drops);
	$: drops && map && fitMapView(drops);
</script>

<MapLibre
	bind:map
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
	standardControls
>
	{#each routes as route}
		<GeoJSON data={createGeoJSONLayer(route)}>
			<LineLayer layout={route.style.layout} paint={route.style.paint}></LineLayer>
		</GeoJSON>
		{#each route.drops as drop, index}
			<Marker lngLat={drop.location}>
				<span style={styleToCss(drop.style)}></span>
				{#if drop.metadata}
					<Popup>
						{JSON.stringify(drop.metadata)}
					</Popup>
				{/if}
				<Popup openOn="hover">
					Position on route: {index}
				</Popup>
			</Marker>
		{/each}
	{/each}
</MapLibre>

<style lang="scss">
</style>

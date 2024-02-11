<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { MapRenderer } from '$lib/components/MapRenderer';
	import type { Route, Solution } from '$lib';
	// http://localhost:5173/51.575571,-0.0461452|51.5536944,-0.0714722|51.5784716,-0.0688443|51.5755379,-0.0311646|51.5671091,-0.0290189|51.5759113,-0.0485024

	let map: maplibregl.Map;
	export let data: PageData;

	$: solution = data.solution;
</script>

<MapRenderer {solution}></MapRenderer>

<style lang="scss">
</style>

<script lang="ts">
	import type { PageData } from './$types';
	import { MapLibre } from 'svelte-maplibre';

	export let data: PageData;
</script>

<h1>Routing visualizer</h1>
<textarea>
	{JSON.stringify(data)}
</textarea>
<MapLibre
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class="relative w-full aspect-[9/16] max-h-[70vh] sm:max-h-full sm:aspect-video"
	standardControls
></MapLibre>

<style lang="scss">
</style>

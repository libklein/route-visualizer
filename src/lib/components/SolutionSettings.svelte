<script lang="ts">
	import type { Route, Solution } from '$lib';
	import RouteSettings from './RouteSettings.svelte';

	export let solution: Solution;

	console.log(solution);
</script>

<div class="flex-col flex">
	<span>Test</span>
	{#each solution.routes as route}
		<RouteSettings bind:route></RouteSettings>
	{/each}
</div>

<style lang="scss">
</style>

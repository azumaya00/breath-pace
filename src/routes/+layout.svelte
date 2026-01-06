<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app-layout">
	<Header />
	<main class="app-main">
		<slot />
	</main>
	<Footer />
</div>

<style>
	.app-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding-bottom: var(--footer-height);
	}

	.app-main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>


<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TimerState } from '$lib/types';
	import { t } from '$lib/i18n';

	export let state: TimerState;

	const dispatch = createEventDispatcher<{
		start: void;
		pause: void;
		resume: void;
		reset: void;
		back: void;
	}>();
</script>

<div class="control-buttons">
	<button class="btn btn-outline" on:click={() => dispatch('back')} type="button">
		{$t('ui.back')}
	</button>
	{#if state === 'idle'}
		<button class="btn btn-primary" on:click={() => dispatch('start')} type="button">
			{$t('ui.start')}
		</button>
	{:else if state === 'running'}
		<button class="btn btn-secondary" on:click={() => dispatch('pause')} type="button">
			{$t('ui.pause')}
		</button>
		<button class="btn btn-outline" on:click={() => dispatch('reset')} type="button">
			{$t('ui.reset')}
		</button>
	{:else if state === 'paused'}
		<button class="btn btn-primary" on:click={() => dispatch('resume')} type="button">
			{$t('ui.resume')}
		</button>
		<button class="btn btn-outline" on:click={() => dispatch('reset')} type="button">
			{$t('ui.reset')}
		</button>
	{:else if state === 'completed'}
		<button class="btn btn-outline" on:click={() => dispatch('reset')} type="button">
			{$t('ui.reset')}
		</button>
	{/if}
</div>

<style>
	.control-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.75rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 120px;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.btn-primary:active {
		transform: translateY(0);
	}

	.btn-secondary {
		background: var(--color-secondary);
		color: white;
	}

	.btn-secondary:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.btn-secondary:active {
		transform: translateY(0);
	}

	.btn-outline {
		background: transparent;
		color: var(--color-text);
		border: 2px solid var(--color-border);
	}

	.btn-outline:hover {
		border-color: var(--color-primary);
		background: var(--color-surface);
	}

	@media (max-width: 640px) {
		.btn {
			padding: 0.625rem 1.5rem;
			font-size: 0.9rem;
			min-width: 100px;
		}
	}
</style>


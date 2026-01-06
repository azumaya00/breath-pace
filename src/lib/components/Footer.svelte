<script lang="ts">
	import { getBuildYear } from '$lib/utils/build-date';
	import { t } from '$lib/i18n';

	let buildYear = getBuildYear();
</script>

<footer class="app-footer">
	<div class="footer-content">
		<p>
			© Copyright {buildYear} {$t('ui.appName')}. {$t('ui.footer.allRightsReserved')}
		</p>
	</div>
</footer>

<style>
	.app-footer {
		border-top: 1px solid var(--color-border);
		background: var(--color-footer-bg);
		height: var(--footer-height);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.footer-content {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
		text-align: center;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.footer-content p {
		margin: 0;
		font-size: 0.75rem;
		color: var(--color-secondary);
		line-height: 1;
	}
</style>


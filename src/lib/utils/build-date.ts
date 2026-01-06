// ビルド日時を取得（Viteの環境変数から）
// フォールバック: 現在の年を使用
export function getBuildYear(): number {
	const envBuildDate =
		(typeof process !== 'undefined' && process.env?.VITE_BUILD_DATE) || import.meta.env.VITE_BUILD_DATE;

	if (envBuildDate) {
		const buildDate = new Date(envBuildDate);
		return buildDate.getFullYear();
	}

	return new Date().getFullYear();
}


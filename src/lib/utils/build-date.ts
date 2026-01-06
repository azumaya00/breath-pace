// ビルド日時を取得（Viteの環境変数から）
// フォールバック: 現在の年を使用
export function getBuildYear(): number {
	if (import.meta.env.VITE_BUILD_DATE) {
		const buildDate = new Date(import.meta.env.VITE_BUILD_DATE);
		return buildDate.getFullYear();
	}
	return new Date().getFullYear();
}


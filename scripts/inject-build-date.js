import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const buildDate = new Date().toISOString();
const envFile = join(process.cwd(), '.env.production');

let envContent = '';
try {
	envContent = readFileSync(envFile, 'utf-8');
} catch (e) {
	// .env.production が存在しない場合は新規作成
}

// VITE_BUILD_DATE を追加または更新
const lines = envContent.split('\n');
const dateLineIndex = lines.findIndex((line) => line.startsWith('VITE_BUILD_DATE='));

if (dateLineIndex >= 0) {
	lines[dateLineIndex] = `VITE_BUILD_DATE=${buildDate}`;
} else {
	lines.push(`VITE_BUILD_DATE=${buildDate}`);
}

writeFileSync(envFile, lines.join('\n'), 'utf-8');
console.log(`Injected VITE_BUILD_DATE=${buildDate}`);


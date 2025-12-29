import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { register } from 'tsconfig-paths';
import tsConfig from '../tsconfig.base.json' assert { type: 'json' };

// ✅ Register path aliases manually (no warning)
register({
	baseUrl: path.resolve('.'),
	paths: tsConfig.compilerOptions.paths,
});

// === Load target script and its nearest .env ===
const scriptArgPath = process.argv[2];
if (!scriptArgPath) {
	console.error(
		'❌ Provide a path to a script. Example: npm run script apps/api/src/scripts/index.ts'
	);
	process.exit(1);
}

const absoluteScriptPath = path.resolve(process.cwd(), scriptArgPath);
const scriptDir = path.dirname(absoluteScriptPath);

process.env['NODE_ENV'] = 'script';

const findNearestEnv = (startDir: string): string | undefined => {
	let currentDir = startDir;
	const root = path.parse(currentDir).root;
	const filenames = ['.env.local', '.env'];

	while (currentDir !== root) {
		for (const file of filenames) {
			const envPath = path.join(currentDir, file);
			if (fs.existsSync(envPath)) return envPath;
		}
		currentDir = path.dirname(currentDir);
	}

	return undefined;
};

const envPath = findNearestEnv(scriptDir);
if (envPath) {
	dotenv.config({ path: envPath });
	console.log(`✅ Loaded environment from ${envPath}`);
}

// 🎯 Finally run the script
import(`../${scriptArgPath}`);

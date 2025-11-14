import { readdir } from "node:fs/promises";
import { buildBookSource } from "./generator";

const bookSourceRoot = "./data";
const srcFiles = await readdir(bookSourceRoot, { recursive: true });
for (const srcFile of srcFiles) {
	if (!srcFile.endsWith("result.json")) {
		continue;
	}
	await buildBookSource(srcFile, bookSourceRoot);
	console.log();
}

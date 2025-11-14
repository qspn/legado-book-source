import { watch } from "node:fs";
import { debounce } from "./utils";
import { buildBookSource } from "./generator";

const watchPath = "./data";
const debouncedBuild = debounce(buildBookSource, 500);
const _watcher = watch(
	watchPath,
	{ recursive: true },
	(eventType, filename) => {
		if (!filename) {
			return;
		}
		if (
			filename.endsWith("result.json") ||
			filename.endsWith("bookSource.json")
		) {
			return;
		}
		if (filename.endsWith(".js") || filename.endsWith(".json")) {
			console.log(`📄 ${eventType}: ${filename}`);
			debouncedBuild(filename, watchPath);
		}
	},
);
console.log(`开始监听文件夹: ${watchPath}`);

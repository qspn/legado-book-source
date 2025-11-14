import { readdir } from "node:fs/promises";

// biome-ignore lint/suspicious/noExplicitAny: function warpper
function debounce(func: (...args: any[]) => any, delay: number) {
	let timeout: NodeJS.Timeout;
	return function executedFunction(...args: unknown[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, delay);
	};
}

function createPathProxy(obj: Record<string, unknown>) {
	return new Proxy(
		{},
		{
			get(_, property) {
				if (property === "set") {
					return (pathArray: string[], value: unknown) => {
						let current = obj;
						for (let i = 0; i < pathArray.length - 1; i++) {
							const key = pathArray[i] as string;
							if (!current[key] || typeof current[key] !== "object") {
								throw new Error(
									`Path ${pathArray.slice(0, i + 1).join(".")} is not an object`,
								);
							}
							current = current[key] as Record<string, unknown>;
						}
						const lastKey = pathArray[pathArray.length - 1] as string;
						current[lastKey] = value;
					};
				}
				return createPathProxy(obj);
			},
		},
	) as {
		set: (pathArray: string[], value: string) => void;
	};
}

async function buildAllBookSource(
	bookSourceRoot: string = ".",
	outputPath: string = "./dist/bookSource.json",
) {
	const bookSourceList = [];
	const bookSourceFileList = await readdir(bookSourceRoot, { recursive: true });
	for (const bookSourceFile of bookSourceFileList) {
		if (bookSourceFile.startsWith("all")) {
			continue;
		}
		if (!bookSourceFile.endsWith("result.json")) {
			continue;
		}
		const singleBookSource = await Bun.file(
			`${bookSourceRoot}/${bookSourceFile}`,
		).json();
		bookSourceList.push(singleBookSource);
	}
	await Bun.write(outputPath, JSON.stringify(bookSourceList, null, "\t"));
	console.log(`将独立的各个书源统一写入汇总书源: "${outputPath}"`);
}

export { debounce, createPathProxy, buildAllBookSource };

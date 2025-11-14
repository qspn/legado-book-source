import { readdir } from "node:fs/promises";
import { parse as parsePath } from "node:path";
import type { BookSource } from "./types";
import { createPathProxy } from "./utils";

function getBookSourceJson(bookSource: BookSource) {
	bookSource.bookSourceGroup = ["清风自用", "正版"].join(",");
	bookSource.header = JSON.stringify({
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
		"Accept-Language": "zh-CN,zh; q=0.9",
	});
	bookSource.bookSourceComment = `仅封面/简介/章节信息，无正文 (t.me/qfbsz @${new Date().toLocaleString()})`;
	return JSON.stringify(bookSource, null, "\t");
}

async function updateBookSourceDist(
	bookSourceRoot: string = ".",
	outputPath: string = "./dist/bookSource.json",
) {
	const bookSourceList = [];
	const bookSourceFileList = await readdir(bookSourceRoot, { recursive: true });
	for (const bookSourceFile of bookSourceFileList) {
		if (!bookSourceFile.endsWith("result.json")) {
			continue;
		}
		const singleBookSource = await Bun.file(
			`${bookSourceRoot}/${bookSourceFile}`,
		).json();
		bookSourceList.push(singleBookSource);
	}
	await Bun.write(outputPath, JSON.stringify(bookSourceList, null, "\t"));
	console.log(`已汇总到统一书源: "${outputPath}"`);
}

async function buildBookSource(
	filename: string,
	bookSourceRoot: string = ".",
): Promise<boolean> {
	console.log("🔄 重新构建书源...");
	try {
		const [bookSourceName] = filename.split("\\");
		const bookSourcePath = `${bookSourceRoot}/${bookSourceName}`;
		const bookSourceObj = await Bun.file(
			`${bookSourcePath}/template.json`,
		).json();
		const srcFiles = await readdir(bookSourcePath);
		for (const srcFile of srcFiles) {
			if (srcFile.endsWith(".js")) {
				const buildResult = await Bun.build({
					entrypoints: [`${bookSourcePath}/${srcFile}`],
					format: "esm",
					drop: ["java.log"],
					banner: "<js>",
					footer: "</js>",
					minify: true,
				});
				for (const buildOutput of buildResult.outputs) {
					const javascriptText = await buildOutput.text();
					const bookSourceProxy = createPathProxy(bookSourceObj);
					const jsonPath = parsePath(buildOutput.path)
						.name.split(".")
						.filter(Boolean);
					const javascriptRule = javascriptText.replaceAll("\n", "");
					console.log(
						`将 JavaScript 规则写入书源的 ${jsonPath.join(".")} 属性`,
					);
					bookSourceProxy.set(jsonPath, javascriptRule);
				}
			}
		}
		const bookSourceJson = getBookSourceJson(bookSourceObj);
		const newBookSourcePath = `${bookSourcePath}/result.json`;
		await Bun.write(newBookSourcePath, bookSourceJson);
		await updateBookSourceDist(bookSourceRoot, "./data/bookSource.json");
		console.log(
			`✅ 书源更新成功: "${newBookSourcePath}" (${bookSourceObj.bookSourceName})`,
		);
		return true;
	} catch (error) {
		console.error("❌ 书源更新失败:", error);
	}
	return false;
}

export { buildBookSource };

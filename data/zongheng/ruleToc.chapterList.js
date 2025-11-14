(() => {
	const response = java.post(
		"https://bookapi.zongheng.com/api/chapter/getChapterList",
		`bookId=${cache.get("bookId")}`,
		{ "Content-Type": "application/x-www-form-urlencoded" },
	);
	const responseText = response.body();
	const tocObj = JSON.parse(responseText);
	const tocList = tocObj.result.chapterList
		.map((item) => item.chapterViewList)
		.reduce((acc, curr) => acc.concat(curr), []);
	const toc = tocList.map((c) => {
		return {
			chapterName: c.chapterName,
			chapterUrl: `https://read.zongheng.com/chapter/${c.bookId}/${c.chapterId}.html`,
			chapterInfo: [`${c.issueTime}`, `${c.wordNums} 字`].join(" | "),
			isVip: c.level > 0,
			isPay: c.everBuy,
		};
	});
	// java.log(JSON.stringify(tocList[0]));
	// java.log(JSON.stringify(toc[0]));
	return toc;
})();

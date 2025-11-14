(() => {
	const chapterId = baseUrl.split("/").pop();
	const chapterAccessKey = "i9MrAlKB"; // 根据时间动态变化
	const response = java.post(
		"https://www.cddaoyue.cn/chapter/get_book_chapter_detail_info",
		[`chapter_id=${chapterId}`, `chapter_access_key=${chapterAccessKey}`].join(
			"&",
		),
		{ "Content-Type": "application/x-www-form-urlencoded" },
	);
	const responseText = response.body();
	const tocObj = JSON.parse(responseText);
	return (
		JSON.stringify(tocObj) +
		"\n 并非删除 只是还没逆向加密算法 和刺猬猫同一个架构好像"
	);
})();

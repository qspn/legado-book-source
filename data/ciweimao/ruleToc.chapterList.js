(() => {
	const bookId = baseUrl.split("/").pop();
	const response = java.post(
		"https://www.ciweimao.com/chapter/get_chapter_list_in_chapter_detail",
		[`book_id=${bookId}`, `chapter_id=0`, `orderby=0`].join("&"),
		{ "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
	);
	const responseText = response.body();
	java.setContent(responseText);
	const toc = java.getElements(
		"@css:div.book-chapter-box>ul.book-chapter-list>li",
	);
	return toc;
})();

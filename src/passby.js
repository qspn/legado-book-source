const jsoupPath = "class.search-result-list";
const element = java.getElement(jsoupPath);
if (!element.length) {
	const sourceUrl = source.getKey();
	cookie.removeCookie(sourceUrl);
	java.log(sourceUrl);
	// java.toast("在网页加载完成后，手动点击右上角 [√] 即可");
	java.startBrowserAwait(
		"https://search.zongheng.com/s?keyword=%E9%98%B4%E8%84%89%E5%85%88%E7%94%9F",
		"过纵横搜索的 cookie 验证",
	);
	const url = java.get("url");
	const a = java.ajax(url);
	java.setContent(a);
	java.log(jsoupPath);
	java.getElement(jsoupPath);
}

type BookSource = {
	ruleSearch: {
		// 搜索
		checkKeyWord?: string; // -校验文字
		bookList?: string; // 列表规则
		name?: string; // 书名规则
		author?: string; // 作者规则
		kind?: string; // 分类规则
		wordCount?: string; // 字数规则
		lastChapter?: string; // 最新章节
		intro?: string; // 简介规则
		coverUrl?: string; // 封面规则
		bookUrl?: string; // 详情地址
	};
	ruleBookInfo: {
		// 详情
		init?: string; // 预处理
		name?: string; // 书名规则
		author?: string; // 作者规则
		kind?: string; // 分类规则
		wordCount?: string; // 字数规则
		lastChapter?: string; // 最新章节
		intro?: string; // 简介规则
		coverUrl?: string; // 封面规则
		tocUrl?: string; // 目录地址
		canReName?: string; // 修改书籍
		downloadUrls?: string; // 下载URL
	};
	ruleToc: {
		// 目录
		preUpdateJs?: string; // 更新前JS
		chapterList?: string; // 列表规则
		chapterName?: string; // 章节名称
		chapterUrl?: string; // 章节地址
		formatJs?: string; // 标题处理
		isVolume?: string; // 卷名标识
		updateTime?: string; // 章节信息
		isVip?: string; // 收费标识
		isPay?: string; // 购买标识
		nextTocUrl?: string; // 翻页规则
	};
	ruleContent: {
		// 正文
		content?: string; // 正文规则
		title?: string; // 标题规则
		nextContentUrl?: string; // 翻页规则
		webJs?: string; // 脚本注入
		sourceRegex?: string; // 资源正则
		replaceRegex?: string; // 替换规则
		imageStyle?: string; // 图片样式
		imageDecode?: string; // 图片解密
		payAction?: string; // 购买操作
	};
	ruleReview: object; // TODO:未知
	ruleExplore: {
		// 发现
		bookList?: string; // 列表规则
		name?: string; // 书名规则
		author?: string; // 作者规则
		kind?: string; // 分类规则
		wordCount?: string; // 字数规则
		lastChapter?: string; // 最新章节
		intro?: string; // 简介规则
		coverUrl?: string; // 封面规则
		bookUrl?: string; // 详情地址
	};
	bookSourceType: 0 | 1 | 2 | 3; // 源类型:文本 | 音频 | 图片 | 文件
	bookSourceUrl: string; // 源域名
	bookSourceName: string; // 源名称
	bookSourceGroup?: string; // 源分组
	bookSourceComment?: string; // 源注释
	loginUrl?: string; // 登录地址
	loginUi?: string; // 登录界面
	loginCheckJs?: string; // 登录检测
	coverDecodeJs?: string; // 封面解密
	bookUrlPattern?: string; // 链接验证
	header?: string; // 请求头
	variableComment?: string; // 变量说明
	concurrentRate?: string; // 并发率
	jsLib?: string; // js库
	searchUrl?: string; // 搜索地址
	exploreUrl?: string; // 发现地址
	enabled?: boolean; // 启用搜索
	enabledExplore?: boolean; // 启用发现
	enabledCookieJar?: boolean; // 启用 CookieJar
	weight?: number; // 搜索权重
	customOrder?: number; // 排序编号
};

export type { BookSource };

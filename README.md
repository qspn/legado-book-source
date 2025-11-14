# Legado(开源阅读) 书源打包工具

- [Legado 书源规则说明](https://mgz0227.github.io/The-tutorial-of-Legado/Rule/source.html)
- [常用函数相关源码](https://github.com/gedoor/legado/blob/master/app/src/main/java/io/legado/app/help/JsExtensions.kt)

```bash
# 进行开发 (编辑/调试书源)
$ bun run dev

# 将生成的独立书源统一写入汇总书源
$ bun run build
```

阅读 APP >「订阅」标签页 > 左上「规则订阅」> 添加新的规则订阅（类型：`书源`）
```
# GitHub
https://raw.githubusercontent.com/qspn/legado-book-source/refs/heads/main/data/bookSource.json

# Cloudflare CDN
https://legado.kksk.eu.org/bookSource.json
```

## Todo

```javascript
// Note
```

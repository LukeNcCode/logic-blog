# 裸机思维 · RawLogic

单文件 SPA 博客（`blog.html` + 本地字体 + JS 数据文件），可直接部署到 GitHub Pages，无需构建、无需后台。

## 目录结构

```
blog.html        # 单文件 SPA（路由/视图/动效）
fonts/           # 本地打包字体（SF Pro / JetBrains Mono / Noto Sans SC）
data/
  posts.js       # 文章元数据清单（标题/摘要/标签/日期/状态）
  content/*.js   # 正文，每篇一个文件（进入详情页才加载）
  site.js        # 技术栈 / 联系方式配置
.nojekyll        # 禁用 Jekyll（必须保留）
README.md
```

## 部署

1. 推送 `blog.html`、`fonts/`、`data/`、`.nojekyll` 到 GitHub 仓库。
2. 仓库 **Settings → Pages → Source: Deploy from a branch → main → Save**。
3. 访问 `https://<用户名>.github.io/<仓库名>/`。

## 添加一篇文章（纯文件，两步）

1. **正文**：复制 `data/content/` 里任意一个 `.js` 文件为 `data/content/新文章id.js`，改成你的内容：

   ```js
   window.__BLOG_CONTENT = window.__BLOG_CONTENT || {};
   window.__BLOG_CONTENT["新文章id"] = {
     "id": "新文章id",
     "content": "第一段。\n\n```c\n代码块内容\n```\n\n更多段落。"
   };
   ```

2. **清单**：在 `data/posts.js` 的数组里加一条（标题/摘要等）：

   ```js
   {
     "id": "新文章id",
     "status": "published",
     "date": "2026-09-01",
     "tags": ["标签1", "标签2"],
     "title": "文章标题",
     "summary": "列表页显示的一句话摘要",
     "contentLen": 500
   }
   ```

   - `status`: `published`（列表显示）或 `draft`（隐藏）
   - `contentLen`: 正文字符数（估算阅读时长，随便填个整数即可）

保存刷新即生效。`content` 支持空行分段与 ``` 围栏代码块（C 语言自动高亮）。

## 修改其他内容

- **文章正文**：直接改 `data/content/<id>.js` 里的 `content`，刷新即生效。
- **技术栈 / 联系方式**：改 `data/site.js`，刷新即生效。
- **站点文案**：`blog.html` 里的 `I18N` 字典（中英文）。

## 数据加载机制

- 启动加载 `data/posts.js`（元数据，KB 级，首页/列表秒开）与 `data/site.js`。
- 进入详情页才加载对应 `data/content/<id>.js`（正文按需，文章再多也不影响列表速度）。
- 全部通过动态 script 标签加载（file:// 与线上一致），**文件优先于缓存**，改文件刷新立即生效。
- 数据文件缺失时回退浏览器 localStorage 缓存（不影响浏览旧文章）。

## 性能说明

元数据与正文分离：列表/首页永不下载正文；每篇文章正文独立文件、独立加载。文章数量增长不影响首屏速度。

## 关于后台

本项目不提供在线后台。纯静态托管没有服务器，"编辑即发布"：改文件 → 刷新/`git push`。多人协作时按 git 常规流程处理。

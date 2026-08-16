# 裸机思维 · RawLogic

单文件 SPA 博客（`index.html` + 本地字体 + Markdown 数据文件），部署到 GitHub Pages，无需构建、无需后台。

## 目录结构

    index.html          # 单文件 SPA（路由/视图/动效/搜索/标签筛选）
    fonts/              # 本地打包字体（SF Pro / JetBrains Mono / Noto Sans SC）
    images/             # 文章图片（可选，随站点上传）
    data/
      posts.js          # 文章元数据清单（标题/摘要/标签/日期/状态）
      content/*.md      # 正文，每篇一个 Markdown 文件（进入详情页才加载）
      site.js           # 技术栈 / 联系方式配置
    .nojekyll           # 禁用 Jekyll（必须保留）
    README.md

## 部署

1. 推送 `index.html`、`fonts/`、`data/`、`images/`、`.nojekyll` 到 GitHub 仓库。
2. 仓库 **Settings → Pages → Source: Deploy from a branch → main → Save**。
3. 访问 `https://<用户名>.github.io/<仓库名>/`。

## 添加一篇文章（两步）

**1. 正文**：在 `data/content/` 新建 `<文章id>.md`，用 Markdown 书写：

    # 标题

    第一段内容。

    ```c
    #include "stm32f1xx.h"
    void main(void) {}
    ```

    ![图片说明](images/photo.jpg)

    - 列表项一
    - 列表项二

    > 引用文字。

支持：标题（#~####）、粗体、斜体、行内代码、链接、无序/有序列表、引用、代码块（``` 或 ~~~ 围栏，C 自动高亮）、图片、空行分段。

**2. 清单**：在 `data/posts.js` 数组里加一条：

    {
      "id": "新文章id",
      "status": "published",
      "date": "2026-09-01",
      "tags": ["标签1", "标签2"],
      "title": "文章标题",
      "summary": "列表页显示的一句话摘要",
      "contentLen": 500
    }

- `status`: `published`（列表显示）或 `draft`（隐藏）
- `contentLen`: 正文字符数（估算阅读时长）

## 本地预览

正文是 `.md` 文件，**双击打开（file://）无法读取**（浏览器安全限制）。本地预览用任意静态服务器，例如：

    npx serve

然后访问 `http://localhost:3000/`。改文件后刷新即可看到变化；部署后线上自动更新，无需本地热更新。

## 修改其他内容

- **文章正文**：改 `data/content/<id>.md`，刷新（线上 push）即生效。
- **技术栈 / 联系方式**：改 `data/site.js`，刷新即生效。
- **站点文案**：`index.html` 里的 `I18N` 字典（中英文）。

## 数据加载机制

- 启动加载 `data/posts.js`（元数据）与 `data/site.js`（KB 级，首页/列表秒开）。
- 进入详情页才 `fetch data/content/<id>.md`（正文按需，文章再多不影响列表速度）。
- 正文加载失败（文件缺失）时回退浏览器 localStorage 缓存，旧 `.js` 格式正文文件仍兼容。
- 线上（https）与本地服务器（http）行为一致；`file://` 双击仅能浏览已缓存过的文章。

## 性能说明

元数据与正文分离：列表/首页永不下载正文；每篇正文独立 `.md` 文件、独立加载。文章数量增长不影响首屏速度。

## admin-cover-display

文章列表卡片正确显示封面图（含默认兜底）。

### 后端静态服务

- `admin/server/index.ts` 添加:
  ```ts
  app.use('/solutions', express.static(SOLUTIONS_DIR))
  ```
- 放在 API 路由之前，让 `/solutions/**` 的请求直接返回文件

### 前端默认封面

- ArticleList.vue 中，当 `article.cover` 为空时，根据 slug 计算默认封面:
  ```ts
  function getCover(article) {
    if (article.cover) return '/' + article.cover
    const hash = article.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `/solutions/_default-covers/${(hash % 20) + 1}.jpg`
  }
  ```
- 卡片 img src 使用此函数返回值

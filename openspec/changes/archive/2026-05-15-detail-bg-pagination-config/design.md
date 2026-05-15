## Context

详情页 blur(24px) + opacity 0.2 太淡。列表页文章增多后需要分页。左侧 sidebar 220px + gap 24px 占去 244px，内容区约 956px。

## Goals / Non-Goals

**Goals:**
- 详情页背景图更清晰可见但不遮挡内容（降低 blur，调整 opacity/布局）
- 列表页分页：上/下页按钮 + 页码指示
- 配置文件控制：每页数量（pageSize）、每行列数（columns）
- 列数约束：min=2, max=3（因为内容区 ~956px，3 列 * 300px 刚好）

**Non-Goals:**
- 不做无限滚动
- 不做 URL 同步页码

## Decisions

### 1. 详情页背景图样式调整

```css
.detail-cover-bg {
  filter: blur(8px);        /* 原 24px，改为 8px 更清晰 */
  opacity: 0.35;            /* 原 0.2，提高一些 */
  height: 360px;            /* 稍大 */
}
```

内容区保持白底半透明遮罩确保文字可读。

### 2. 配置文件结构

```typescript
// src/config/solutions.ts
export const solutionsConfig = {
  pageSize: 6,
  columns: 3,
  columnsMin: 2,
  columnsMax: 3,
}
```

### 3. 分页实现

简单的前端分页，computed 切片：
```typescript
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filtered.length / config.pageSize))
const pagedArticles = computed(() => filtered.slice((page-1)*size, page*size))
```

### 4. 列数配置应用

用 CSS 变量或内联 style 设置 grid-template-columns 的 repeat 数量。

## Risks / Trade-offs

- **[3 列在窄屏可能挤]** → 仍保留响应式 auto-fill 作为 fallback，配置的列数只影响桌面端

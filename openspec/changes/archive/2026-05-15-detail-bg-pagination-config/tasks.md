## 1. 清理自定义封面图

- [x] 1.1 删除 public/solutions/ 下所有非默认的图片文件（保留 defaults/ 目录）
- [x] 1.2 重新生成索引

## 2. 配置文件

- [x] 2.1 创建 `src/config/solutions.ts`，定义 pageSize、columns、columnsMin、columnsMax

## 3. 列表页分页

- [x] 3.1 引入配置，实现分页逻辑（currentPage, totalPages, pagedArticles）
- [x] 3.2 添加分页控件 UI（上一页/下一页按钮 + 页码指示）
- [x] 3.3 grid 列数从配置读取，设置为固定 repeat(columns, 1fr)
- [x] 3.4 切换筛选/翻页时重置页码

## 4. 详情页背景图

- [x] 4.1 调整背景图样式：降低 blur（8px）、提高 opacity（0.35）、增加高度
- [x] 4.2 内容区确保白底遮罩保持可读性

## 5. 验证

- [x] 5.1 TypeScript 类型检查通过
- [x] 5.2 构建无报错

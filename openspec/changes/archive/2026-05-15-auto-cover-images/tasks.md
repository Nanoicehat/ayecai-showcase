## 1. 默认风景图

- [x] 1.1 创建 `public/solutions/defaults/` 目录
- [x] 1.2 下载 6 张风景图到该目录（使用 picsum.photos 固定 seed）

## 2. 构建脚本改造

- [x] 2.1 修改索引脚本，自动检测同名图片文件作为 cover
- [x] 2.2 移除对 frontmatter `cover` 字段的依赖

## 3. 前端适配

- [x] 3.1 SolutionsList.vue 无 cover 时使用默认风景图（基于 slug hash 选择）
- [x] 3.2 移除渐变色兜底逻辑，统一用图片
- [x] 3.3 SolutionDetail.vue 同步适配（默认图也可作为模糊背景）

## 4. 数据清理

- [x] 4.1 移除 mock 文档中的 `cover` frontmatter 字段
- [x] 4.2 将现有 SVG 封面图重命名为与文档同名
- [x] 4.3 重新生成索引验证

## 5. 验证

- [x] 5.1 TypeScript 类型检查通过
- [x] 5.2 构建无报错

## 1. Scroll Reveal 基建

- [ ] 1.1 实现 IntersectionObserver 驱动 scroll-reveal（observe `[data-reveal]`，toggle `.revealed` class）
- [ ] 1.2 实现 5 种动画变体 CSS（fade-up, fade-left, fade-right, scale-in, fade-only）
- [ ] 1.3 在 onUnmounted 中 disconnect observer

## 2. Hero 重构

- [ ] 2.1 粒子背景：CSS 多 div + 随机 keyframes 浮动动画
- [ ] 2.2 逐字标题入场 + 副标题 fade-up
- [ ] 2.3 4 个统计数字 + Observer 触发 countUp 动画
- [ ] 2.4 标签 badges 保留，增强 hover 效果

## 3. 特性卡片升级

- [ ] 3.1 玻璃态样式：backdrop-filter blur + 半透明背景 + 浅色边框
- [ ] 3.2 hover 3D 效果：translateY + rotateX 微倾斜
- [ ] 3.3 滚动 reveal 入场（data-reveal + stagger）

## 4. 技术栈进度条

- [ ] 4.1 水平进度条 UI（label + track + fill）
- [ ] 4.2 IntersectionObserver 触发 fill 动画（CSS transition width）

## 5. 时间轴组件

- [ ] 5.1 垂直时间轴布局（竖线 + 步骤节点 + 描述卡片）
- [ ] 5.2 IntersectionObserver 触发节点依次点亮

## 6. 终端升级

- [ ] 6.1 打字机光标闪烁 CSS 动画
- [ ] 6.2 每行命令添加复制按钮 + clipboard API
- [ ] 6.3 复制成功后图标切换为 ✓（1.5s 后恢复）

## 7. 验证

- [ ] 7.1 `npx vue-tsc --noEmit` 类型检查通过
- [ ] 7.2 `npm run build` 构建通过
- [ ] 7.3 dev server 手动验证：滚动 + hover + 复制功能

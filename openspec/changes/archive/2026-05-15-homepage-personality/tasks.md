## 1. 类型与配置

- [x] 1.1 在 `src/types/project.ts` 中添加 `ShowcaseStyle` 接口和 `ProjectConfig.showcase` 可选字段
- [x] 1.2 为 4 个项目的 `config.ts` 添加 `showcase` 配置（各自不同的渐变色、强调色、动画类型）

## 2. ProjectCard 个性化

- [x] 2.1 ProjectCard 读取 `showcase` 配置，通过 `:style` 注入 `--showcase-bg` 和 `--showcase-accent` CSS 变量
- [x] 2.2 添加 5 种入场动画 CSS class（slide-up/slide-left/slide-right/fade-scale/rotate-in），根据 `showcase.animation` 动态绑定
- [x] 2.3 标签和按钮样式使用 `var(--showcase-accent)` 替代固定颜色
- [x] 2.4 卡片背景使用 `var(--showcase-bg)` 渐变
- [x] 2.5 添加 `prefers-reduced-motion` 媒体查询禁用动画

## 3. Hero 个性化

- [x] 3.1 Hero 区域添加身份角色标签行（带装饰横线）
- [x] 3.2 添加 CSS 装饰浮动几何图形（圆、三角、方块），低透明度 + 浮动动画
- [x] 3.3 浮动图形添加 `prefers-reduced-motion` 支持

## 4. NavBar 品牌化

- [x] 4.1 NavBar 标题改为"阿椰菜"渐变文字 + `✦` 星标
- [x] 4.2 星标添加 hover 旋转动画
- [x] 4.3 渐变色与 Hero 保持一致

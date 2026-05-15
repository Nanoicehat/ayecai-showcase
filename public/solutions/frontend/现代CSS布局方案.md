---
title: 现代 CSS 布局方案速查
date: 2025-04-20
category: frontend
summary: Grid、Flexbox、容器查询三大布局方案的实战选型指南与代码片段
---

## 选型决策树

```
需要二维布局？ → Grid
需要一维排列？ → Flexbox
需要组件级响应？ → 容器查询
```

## CSS Grid 实战

### 经典圣杯布局

```css
.layout {
  display: grid;
  grid-template:
    "header header header" auto
    "nav    main   aside" 1fr
    "footer footer footer" auto
    / 200px 1fr 250px;
  min-height: 100vh;
}
```

### 自适应卡片网格

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## Flexbox 常用模式

### 垂直居中

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 底部固定页脚

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main { flex: 1; }
```

### 等分但允许换行

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.col {
  flex: 1 1 300px;
}
```

## 容器查询（2024 后主流）

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}

@container (max-width: 399px) {
  .card {
    flex-direction: column;
  }
}
```

## 对比总结

| 特性 | Grid | Flexbox | 容器查询 |
|:--|:--|:--|:--|
| 维度 | 二维 | 一维 | 不限（响应式） |
| 适合 | 页面布局 | 组件内排列 | 组件自适应 |
| 浏览器支持 | 97%+ | 99%+ | 91%+ |
| 学习成本 | 中 | 低 | 低 |

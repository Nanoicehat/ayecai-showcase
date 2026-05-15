---
title: GitHub Actions CI/CD 流水线模板
date: 2025-04-28
category: devops
summary: 一套可复用的 GitHub Actions 配置，覆盖代码检查、测试、构建、部署全流程
---

## 基础模板

```yaml
name: CI/CD 流水线

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 高级技巧

### 矩阵策略

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
    os: [ubuntu-latest, macos-latest]
```

### 缓存优化

`actions/setup-node` 的 `cache: 'npm'` 自动缓存依赖。自定义缓存：

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
```

### 条件部署

```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

## 常见坑

1. **权限不足**：需要在仓库设置 → Actions → General 开启工作流写权限
2. **缓存失效**：lock 文件变了缓存就失效，确保 lock 文件已提交
3. **并发部署**：加 `concurrency` 字段避免多次部署冲突

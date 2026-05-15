---
title: Docker 多阶段构建最佳实践
date: 2025-05-08
category: devops
summary: 通过多阶段构建将 Node.js 应用镜像从 1.2GB 压缩到 89MB，附完整 Dockerfile 模板
---

## 问题：镜像太大

典型的 Node.js 应用镜像动辄 1GB+，包含了大量构建时依赖和开发工具。

## 解决方案：多阶段构建

### 第一阶段：构建

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && cp -R node_modules prod_modules
RUN npm ci
COPY . .
RUN npm run build
```

### 第二阶段：运行

```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prod_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
USER node
CMD ["node", "dist/main.js"]
```

## 优化技巧

### 1. 利用缓存层

把不常变的 `package.json` 先复制，利用 Docker 层缓存：

```dockerfile
COPY package*.json ./
RUN npm ci
# 上面两层很少变，会命中缓存
COPY . .
# 这层每次都变
```

### 2. 使用 .dockerignore

```
node_modules
dist
.git
*.md
.env*
```

### 3. 安全加固

- 用 `USER node` 避免 root 运行
- 用 `npm ci` 而非 `npm install`（确保锁文件一致）
- 扫描漏洞：`docker scout cves`

## 效果对比

| 方案 | 镜像大小 | 构建时间 |
|:--|:--|:--|
| 单阶段 node:20 | 1.2 GB | 45s |
| 单阶段 node:20-alpine | 450 MB | 38s |
| 多阶段 alpine | 89 MB | 52s |
| 多阶段 + distroless | 67 MB | 55s |

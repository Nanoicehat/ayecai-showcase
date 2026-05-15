---
title: PostgreSQL 查询优化实战
date: 2025-05-01
category: backend/database
summary: 从执行计划分析到索引策略，实际案例将慢查询从 3.2 秒优化到 12 毫秒
---

## 诊断工具

### 执行计划分析

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 20;
```

关注指标：
- **顺序扫描** → 全表扫描，考虑加索引
- **嵌套循环** 行数多 → 考虑哈希连接
- **外部磁盘排序** → 增加 work_mem

## 实战案例

### 原始查询：3.2 秒

```sql
SELECT * FROM orders
WHERE status = 'pending'
AND created_at > NOW() - INTERVAL '7 days'
ORDER BY priority DESC, created_at ASC;
```

问题：`status` 列选择性低（只有 5 个值），`created_at` 范围大。

### 优化后：12 毫秒

```sql
-- 创建部分复合索引
CREATE INDEX idx_orders_status_created_priority
ON orders (status, created_at DESC, priority DESC)
WHERE status = 'pending';  -- 部分索引！
```

部分索引只为 `pending` 状态建索引，体积小、更新快。

## 索引策略

| 场景 | 索引类型 | 示例 |
|:--|:--|:--|
| 等值查询 | B-tree | `CREATE INDEX ON users (email)` |
| 范围查询 | B-tree 复合 | `CREATE INDEX ON logs (created_at, level)` |
| 全文搜索 | GIN | `CREATE INDEX ON posts USING gin(to_tsvector('chinese', content))` |
| JSON 字段 | GIN | `CREATE INDEX ON events USING gin(metadata jsonb_path_ops)` |
| 地理位置 | GiST | `CREATE INDEX ON places USING gist(location)` |
| 低选择性 + 范围 | 部分索引 | `WHERE status = 'active'` |

## 常见误区

1. **索引不是越多越好** — 每个索引都有写入成本
2. **复合索引顺序很重要** — 等值列在前，范围列在后
3. **不要在高频更新列建索引** — 考虑覆盖索引替代
4. **定期更新统计信息** — 统计信息过期会导致执行计划错误

## 监控慢查询

```sql
-- 找出最慢的查询
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

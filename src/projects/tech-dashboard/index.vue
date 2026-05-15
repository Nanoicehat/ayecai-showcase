<template>
  <div class="dashboard">
    <div class="stats-row">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-change" :class="stat.trend">{{ stat.change }}</div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <h3>本周活跃度</h3>
        <div class="bar-chart">
          <div v-for="(bar, i) in bars" :key="i" class="bar-wrapper">
            <div class="bar" :style="{ height: bar.height + '%' }" />
            <span class="bar-label">{{ bar.day }}</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3>近期任务</h3>
        <ul class="task-list">
          <li v-for="(task, i) in tasks" :key="i" class="task-item">
            <span class="task-dot" :class="task.status" />
            <span>{{ task.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { label: '总用户数', value: '12,847', change: '+12.5%', trend: 'up' },
  { label: '营收', value: '¥23.4万', change: '+8.1%', trend: 'up' },
  { label: '转化率', value: '3.24%', change: '-0.4%', trend: 'down' },
  { label: '当前在线', value: '573', change: '+24', trend: 'up' },
]

const bars = [
  { day: '周一', height: 65 },
  { day: '周二', height: 80 },
  { day: '周三', height: 45 },
  { day: '周四', height: 90 },
  { day: '周五', height: 70 },
  { day: '周六', height: 35 },
  { day: '周日', height: 55 },
]

const tasks = [
  { name: '更新 API 接口', status: 'done' },
  { name: '审查代码合并请求', status: 'active' },
  { name: '部署测试环境', status: 'active' },
  { name: '编写技术文档', status: 'pending' },
  { name: '修复登录令牌刷新', status: 'done' },
]
</script>

<style scoped>
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.stat-change {
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  font-weight: 500;
}

.stat-change.up { color: #22c55e; }
.stat-change.down { color: #ef4444; }

.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
}

.chart-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.chart-card h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text);
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-md);
  height: 200px;
}

.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
}

.bar {
  width: 100%;
  max-width: 40px;
  background: var(--color-primary);
  border-radius: 4px 4px 0 0;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.bar:hover {
  opacity: 1;
}

.bar-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-sm);
}

.task-list {
  list-style: none;
}

.task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}

.task-item:last-child {
  border-bottom: none;
}

.task-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.task-dot.done { background: #22c55e; }
.task-dot.active { background: var(--color-primary); }
.task-dot.pending { background: var(--color-text-light); }

@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
}
</style>

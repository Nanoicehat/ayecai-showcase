<template>
  <div class="preview-dashboard">
    <div class="mini-stats">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="mini-stat"
        :style="{ animationDelay: `${i * 0.15}s` }"
      >
        <div class="mini-value">{{ animatedValues[i] }}</div>
        <div class="mini-label">{{ stat.label }}</div>
      </div>
    </div>
    <div class="chart-container">
      <svg
        class="line-chart"
        :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#a5b4fc" />
          </linearGradient>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#a5b4fc" stop-opacity="0.02" />
          </linearGradient>
        </defs>
        <path :d="areaPath" fill="url(#area-gradient)" class="chart-area" />
        <polyline
          :points="polylinePoints"
          fill="none"
          stroke="url(#line-gradient)"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="chart-line"
          :style="{ strokeDasharray: lineLength, strokeDashoffset: lineLength }"
        />
      </svg>
      <div class="data-points">
        <div
          v-for="(pt, i) in dataPointPositions"
          :key="i"
          class="data-point"
          :style="{
            left: pt.x + '%',
            bottom: pt.y + '%',
            animationDelay: `${1.8 + i * 0.08}s`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const stats = [
  { label: '用户', target: 12847 },
  { label: '营收', target: 23400 },
  { label: '转化', target: 324 },
]

const chartData = [20, 45, 30, 65, 50, 80, 60]
const chartWidth = 280
const chartHeight = 120
const paddingX = 16
const paddingY = 12

const animatedValues = ref(['0', '0', '0'])
let frame: number | null = null

// Compute SVG polyline points
const chartPoints = computed(() => {
  const maxVal = Math.max(...chartData)
  const usableWidth = chartWidth - paddingX * 2
  const usableHeight = chartHeight - paddingY * 2
  return chartData.map((val, i) => ({
    x: paddingX + (i / (chartData.length - 1)) * usableWidth,
    y: paddingY + usableHeight - (val / maxVal) * usableHeight,
  }))
})

const polylinePoints = computed(() =>
  chartPoints.value.map((p) => `${p.x},${p.y}`).join(' ')
)

// Area path (fill below the line)
const areaPath = computed(() => {
  const pts = chartPoints.value
  if (pts.length === 0) return ''
  let d = `M ${pts[0].x},${chartHeight - paddingY}`
  pts.forEach((p) => {
    d += ` L ${p.x},${p.y}`
  })
  d += ` L ${pts[pts.length - 1].x},${chartHeight - paddingY} Z`
  return d
})

// Data point positions as percentages for CSS positioning
const dataPointPositions = computed(() => {
  const maxVal = Math.max(...chartData)
  const usableWidth = chartWidth - paddingX * 2
  const usableHeight = chartHeight - paddingY * 2
  return chartData.map((val, i) => ({
    x: ((paddingX + (i / (chartData.length - 1)) * usableWidth) / chartWidth) * 100,
    y: ((val / maxVal) * usableHeight / chartHeight) * 100,
  }))
})

// Calculate polyline total length for stroke-dasharray animation
const lineLength = computed(() => {
  const pts = chartPoints.value
  let length = 0
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x
    const dy = pts[i].y - pts[i - 1].y
    length += Math.sqrt(dx * dx + dy * dy)
  }
  return length
})

onMounted(() => {
  const start = performance.now()
  const duration = 1500

  function animate(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)

    animatedValues.value = stats.map((s) => {
      const val = Math.floor(s.target * ease)
      return val >= 10000 ? (val / 1000).toFixed(1) + 'k' : val.toLocaleString()
    })

    if (progress < 1) frame = requestAnimationFrame(animate)
  }

  frame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>

<style scoped>
.preview-dashboard {
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(135deg, #f5f5ff 0%, #eef0ff 100%);
}

/* ---------- Stat Cards with 3D Flip ---------- */
.mini-stats {
  display: flex;
  gap: 12px;
  perspective: 800px;
}

.mini-stat {
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
  opacity: 0;
  transform: rotateX(90deg);
  transform-origin: center bottom;
  animation: flipIn 0.5s ease forwards;
}

.mini-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #6366f1;
}

.mini-label {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 4px;
}

@keyframes flipIn {
  0% {
    opacity: 0;
    transform: rotateX(90deg);
  }
  60% {
    opacity: 1;
    transform: rotateX(-8deg);
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
  }
}

/* ---------- Chart Container ---------- */
.chart-container {
  flex: 1;
  position: relative;
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
  overflow: hidden;
}

.line-chart {
  width: 100%;
  height: 100%;
  display: block;
}

/* ---------- SVG Line Draw Animation ---------- */
.chart-line {
  animation: drawLine 1.5s ease forwards;
  animation-delay: 0.5s;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* ---------- Area Fill Fade-in ---------- */
.chart-area {
  opacity: 0;
  animation: fadeInArea 0.8s ease forwards;
  animation-delay: 1.2s;
}

@keyframes fadeInArea {
  to {
    opacity: 1;
  }
}

/* ---------- Data Point Pulse ---------- */
.data-points {
  position: absolute;
  inset: 16px;
}

.data-point {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6366f1;
  transform: translate(-50%, 50%);
  opacity: 0;
  animation: pointAppear 0.3s ease forwards, pointPulse 2s ease-in-out 0.3s infinite;
}

@keyframes pointAppear {
  to {
    opacity: 1;
  }
}

@keyframes pointPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(99, 102, 241, 0);
  }
}
</style>

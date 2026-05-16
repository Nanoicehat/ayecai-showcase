<template>
  <div class="showcase">
    <!-- ====== HERO ====== -->
    <section class="hero">
      <div class="hero-particles">
        <div v-for="p in particles" :key="p.id" class="particle" :style="p.style" />
      </div>
      <div class="hero-glow" />
      <div class="hero-content">
        <div class="hero-badge-main">🛠️ 个人主页</div>
        <h1 class="hero-title">
          <span v-for="(char, i) in titleChars" :key="i" class="title-char" :style="{ animationDelay: `${0.4 + i * 0.06}s` }">{{ char }}</span>
        </h1>
        <p class="hero-sub">个人开源项目展示 & 技术方案收录，部署在 GitHub Pages</p>
        <div class="hero-tags">
          <span class="tag">Vue 3</span>
          <span class="tag">Vite</span>
          <span class="tag">TypeScript</span>
          <span class="tag">GitHub Pages</span>
        </div>
        <div class="hero-stats">
          <div v-for="s in stats" :key="s.label" class="stat" :ref="(el) => setStatRef(s.label, el)">
            <span class="stat-num">{{ displayed[s.label] ?? 0 }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== FEATURES ====== -->
    <section class="features">
      <h2 class="section-heading" data-reveal="fade-up">核心特性</h2>
      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card"
          :data-reveal="i % 2 === 0 ? 'fade-right' : 'fade-left'"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div class="card-shine" />
          <div class="feature-icon-box">
            <span class="feature-icon">{{ f.icon }}</span>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ====== TECH STACK ====== -->
    <section class="tech-section">
      <h2 class="section-heading" data-reveal="fade-up">技术栈</h2>
      <div class="tech-bars" data-reveal="fade-up">
        <div v-for="t in techs" :key="t.name" class="tech-bar-item">
          <div class="tech-bar-label">
            <span>{{ t.name }}</span>
            <span class="tech-bar-pct">{{ displayedPct[t.name] ?? 0 }}%</span>
          </div>
          <div class="tech-bar-track">
            <div
              class="tech-bar-fill"
              :class="{ filled: barFilled[t.name] }"
              :style="{ width: barFilled[t.name] ? `${t.pct}%` : '0%' }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ====== TIMELINE ====== -->
    <section class="timeline-section">
      <h2 class="section-heading" data-reveal="fade-up">项目流程</h2>
      <div class="timeline" data-reveal="fade-only" data-timeline-container>
        <div class="timeline-line" :class="{ filled: lineFilled }" />
        <div
          v-for="(step, i) in timeline"
          :key="i"
          class="timeline-step"
          :class="{ active: stepActive[i] }"
          :data-timeline-step="i"
        >
          <div class="timeline-dot">
            <span>{{ step.icon }}</span>
          </div>
          <div class="timeline-card">
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== TERMINAL ====== -->
    <section class="terminal-section">
      <h2 class="section-heading" data-reveal="fade-up">本地运行</h2>
      <div class="terminal" data-reveal="scale-in">
        <div class="terminal-bar">
          <span class="t-dot" /><span class="t-dot" /><span class="t-dot" />
          <span class="terminal-title">Terminal</span>
        </div>
        <div class="terminal-body">
          <div v-for="(line, i) in commands" :key="i" class="t-line" :style="{ animationDelay: `${i * 0.4}s` }">
            <span class="t-prompt">$</span>
            <span class="t-cmd">{{ line }}</span>
            <button class="t-copy" :class="{ copied: copiedIndex === i }" @click.stop="copyCmd(line, i)" :aria-label="`Copy ${line}`">
              <svg v-if="copiedIndex !== i" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          </div>
          <span class="t-cursor" />
        </div>
      </div>
    </section>

    <!-- ====== FOOTER ====== -->
    <footer class="page-footer" data-reveal="fade-only">
      <p>推送 <code>main</code> 分支后，GitHub Actions 自动构建并部署到 GitHub Pages</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

// ─── Hero particles ──────────────────────────────
const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  style: {
    width: `${40 + Math.sin(i * 1.7) * 30}px`,
    height: `${40 + Math.cos(i * 2.1) * 30}px`,
    left: `${(i * 29 + 8) % 100}%`,
    top: `${(i * 47 + 13) % 100}%`,
    animationDuration: `${7 + (i % 4) * 2.5}s`,
    animationDelay: `${-(i * 0.6)}s`,
    opacity: 0.06 + (i % 5) * 0.03,
  },
}))

const titleChars = '阿椰菜补丁铺'.split('')

// ─── Stats ───────────────────────────────────────
const stats = [
  { label: '开源项目', target: 1 },
  { label: '技术文章', target: 1 },
  { label: '技术栈', target: 4 },
  { label: '零第三方', target: 100 },
]
const displayed = reactive<Record<string, number>>({})
const statRefs: Record<string, HTMLElement | null> = {}
function setStatRef(label: string, el: unknown) {
  statRefs[label] = el as HTMLElement | null
}

function animateStats() {
  stats.forEach(s => {
    const start = 0
    const end = s.target
    const dur = 1500
    const startTime = performance.now()
    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / dur, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      displayed[s.label] = Math.round(start + (end - start) * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

// ─── Features ────────────────────────────────────
const features = [
  { icon: '📦', title: '模块化架构', desc: '每个项目独立文件夹，组件、样式、资源互不干扰' },
  { icon: '🎨', title: '主题覆盖', desc: '项目级 CSS 变量覆盖，进入自动切换，离开恢复' },
  { icon: '📝', title: 'Markdown 文章', desc: '技术方案按目录分类，自动生成索引和目录树' },
  { icon: '⚡', title: '零依赖动画', desc: '纯 CSS 动画 + Intersection Observer，轻量流畅' },
]

// ─── Tech bars ───────────────────────────────────
const techs = [
  { name: 'Vue 3', pct: 85 },
  { name: 'Vite', pct: 78 },
  { name: 'TypeScript', pct: 72 },
  { name: 'CSS', pct: 65 },
]
const barFilled = reactive<Record<string, boolean>>({})
const displayedPct = reactive<Record<string, number>>({})

function animateBars() {
  techs.forEach((t, i) => {
    setTimeout(() => {
      barFilled[t.name] = true
      const start = 0
      const end = t.pct
      const dur = 800
      const startTime = performance.now()
      function tick(now: number) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / dur, 1)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        displayedPct[t.name] = Math.round(start + (end - start) * eased)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, i * 150)
  })
}

// ─── Timeline ────────────────────────────────────
const timeline = [
  { icon: '📁', title: '创建项目目录', desc: '在 src/projects/ 下建立项目文件夹，编写 config.ts 和 index.vue' },
  { icon: '📝', title: '注册 & 配置标签', desc: '在 registry.ts 注册项目，在 tags.ts 关联标签' },
  { icon: '🚀', title: '推送自动部署', desc: 'push 到 main 分支，GitHub Actions 自动构建并部署到 Pages' },
]
const stepActive = ref<boolean[]>([false, false, false])
const lineFilled = ref(false)

// ─── Terminal ────────────────────────────────────
const commands = ['npm install', 'npm run dev', 'npm run build', 'npm run preview']
const copiedIndex = ref<number | null>(null)

async function copyCmd(cmd: string, i: number) {
  try {
    await navigator.clipboard.writeText(cmd)
    copiedIndex.value = i
    setTimeout(() => { copiedIndex.value = null }, 1500)
  } catch {
    // fallback for non-HTTPS
    const ta = document.createElement('textarea')
    ta.value = cmd
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copiedIndex.value = i
    setTimeout(() => { copiedIndex.value = null }, 1500)
  }
}

// ─── Scroll Reveal ───────────────────────────────
let observer: IntersectionObserver | null = null
let statsObserved = false
let barsObserved = false
let timelineObserved = false

function setupScrollReveal() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.classList.add('revealed')

          // Hero stats trigger
          if (el.closest('.hero-stats') && !statsObserved) {
            statsObserved = true
            animateStats()
          }

          // Tech bars trigger
          if (el.closest('.tech-bars') && !barsObserved) {
            barsObserved = true
            animateBars()
          }

          // Timeline: activate when container enters view
          if (el.dataset.timelineContainer !== undefined && !timelineObserved) {
            timelineObserved = true
            setTimeout(() => {
              lineFilled.value = true
              animateTimelineSteps()
            }, 200)
          }

          observer!.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.25, rootMargin: '0px 0px -30px 0px' }
  )

  document.querySelectorAll('[data-reveal]').forEach(el => observer!.observe(el))
}

function animateTimelineSteps() {
  timeline.forEach((_, i) => {
    setTimeout(() => { stepActive.value[i] = true }, i * 350)
  })
}

onMounted(() => {
  nextTick(() => setupScrollReveal())
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* ================================================================
   SHOWCASE — 阿椰菜补丁铺详情页
   ================================================================ */

.showcase {
  max-width: 840px;
  margin: 0 auto;
}

[data-reveal="fade-only"] { transition: opacity 0.3s ease; }
[data-reveal] {
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s ease;
}
[data-reveal="fade-up"]    { transform: translateY(40px); }
[data-reveal="fade-right"] { transform: translateX(-40px); }
[data-reveal="fade-left"]  { transform: translateX(40px); }
[data-reveal="scale-in"]   { transform: scale(0.9); }
[data-reveal="fade-only"]  { transform: none; }

[data-reveal].revealed {
  opacity: 1;
  transform: translate(0) scale(1);
}

/* ── Section Headings ──────────────────────────── */
.section-heading {
  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: 750;
  margin-bottom: var(--spacing-xl);
  color: var(--color-text);
  position: relative;
}
.section-heading::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  border-radius: 2px;
  background: var(--color-primary);
  margin: 10px auto 0;
}

/* ================================================================
   HERO
   ================================================================ */

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 60px 36px 44px;
  margin-bottom: 48px;
  background: linear-gradient(145deg, #fef7f2 0%, #fde8d8 35%, #fcd5bc 70%, #f8c9a8 100%);
}

.hero-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--color-primary);
  animation: particleFloat 8s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  20%  { transform: translate(14px, -18px) scale(1.15); }
  40%  { transform: translate(-10px, 10px) scale(0.85); }
  60%  { transform: translate(-16px, -6px) scale(1.08); }
  80%  { transform: translate(8px, 12px) scale(0.92); }
}

.hero-glow {
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(224,124,84,0.15) 0%, transparent 70%);
  animation: glowPulse 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.2); }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-badge-main {
  display: inline-block;
  padding: 5px 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(6px);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 16px;
  border: 1px solid rgba(224,124,84,0.18);
  animation: fadeUp 0.6s ease-out both;
}

.hero-title {
  margin: 0 0 12px;
  font-size: 3rem;
  font-weight: 850;
  line-height: 1.25;
}

.title-char {
  display: inline-block;
  animation: charPop 0.45s ease-out both;
  background: linear-gradient(135deg, #c25e34 0%, #e07c54 50%, #f0a880 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes charPop {
  0%   { opacity: 0; transform: translateY(28px) scale(0.5); }
  60%  { opacity: 1; transform: translateY(-4px) scale(1.06); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-sub {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0 0 20px;
  animation: fadeUp 0.6s ease-out 1s both;
}

.hero-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
  animation: fadeUp 0.6s ease-out 1.15s both;
}

.tag {
  padding: 4px 14px;
  border-radius: 20px;
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(4px);
  font-size: var(--font-size-xs);
  font-weight: 550;
  color: var(--color-primary-dark);
  border: 1px solid rgba(224,124,84,0.2);
  transition: all 0.3s ease;
}

.tag:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(224,124,84,0.3);
  border-color: var(--color-primary);
}

/* ── Stats ────────────────────────────────────── */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  animation: fadeUp 0.6s ease-out 1.3s both;
}

.stat {
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-primary-dark);
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin-top: 4px;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ================================================================
   FEATURE CARDS (glass)
   ================================================================ */

.features {
  margin-bottom: 52px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.feature-card {
  position: relative;
  overflow: hidden;
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.85);
  border-radius: 16px;
  padding: 28px 24px;
  transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  cursor: default;
  box-shadow: 0 2px 12px rgba(224,124,84,0.05);
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(224,124,84,0.12);
  border-color: var(--color-primary-light);
  background: rgba(255,255,255,0.75);
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%);
  transition: left 0.6s ease;
  pointer-events: none;
}

.feature-card:hover .card-shine {
  left: 100%;
}

.feature-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.35s ease;
  box-shadow: 0 4px 12px rgba(224,124,84,0.2);
}

.feature-card:hover .feature-icon-box {
  transform: scale(1.08) rotate(-4deg);
  box-shadow: 0 6px 18px rgba(224,124,84,0.3);
}

.feature-icon {
  font-size: 1.5rem;
}

.feature-card h3 {
  font-size: var(--font-size-base);
  font-weight: 650;
  margin: 0 0 6px;
  color: var(--color-text);
}

.feature-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0;
}

/* ================================================================
   TECH BARS
   ================================================================ */

.tech-section {
  margin-bottom: 52px;
}

.tech-bars {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tech-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  font-weight: 550;
  color: var(--color-text);
  margin-bottom: 6px;
}

.tech-bar-pct {
  color: var(--color-primary);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.tech-bar-track {
  height: 10px;
  border-radius: 5px;
  background: #fce8da;
  overflow: hidden;
}

.tech-bar-fill {
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  transition: width 1s cubic-bezier(0.22, 0.61, 0.36, 1);
  width: 0%;
}

/* ================================================================
   TIMELINE
   ================================================================ */

.timeline-section {
  margin-bottom: 52px;
}

.timeline {
  position: relative;
  max-width: 540px;
  margin: 0 auto;
  padding-left: 40px;
}

.timeline-line {
  position: absolute;
  left: 18px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-primary-light), var(--color-primary-light), var(--color-primary-light));
  border-radius: 1px;
}

.timeline-line::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0%;
  background: var(--color-primary);
  transition: height 1.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  border-radius: 1px;
}

.timeline-line.filled::after {
  height: 100%;
}

.timeline-step {
  position: relative;
  margin-bottom: 28px;
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.timeline-dot {
  position: absolute;
  left: -40px;
  top: 4px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fef7f2;
  border: 2px solid #f0d0b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.45s ease;
  z-index: 1;
}

.timeline-step.active .timeline-dot {
  background: var(--color-primary);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 6px rgba(224,124,84,0.15);
  transform: scale(1.15);
}

.timeline-dot span {
  font-size: 1rem;
  transition: transform 0.35s ease;
}

.timeline-step.active .timeline-dot span {
  transform: scale(1.2);
}

.timeline-card {
  flex: 1;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border, #f0e0d4);
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.4s ease;
}

.timeline-step.active .timeline-card {
  border-color: var(--color-primary-light);
  box-shadow: 0 4px 16px rgba(224,124,84,0.08);
}

.timeline-card h4 {
  font-size: var(--font-size-sm);
  font-weight: 650;
  margin: 0 0 4px;
  color: var(--color-text);
}

.timeline-card p {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin: 0;
}

/* ================================================================
   TERMINAL
   ================================================================ */

.terminal-section {
  margin-bottom: 52px;
}

.terminal {
  max-width: 540px;
  margin: 0 auto;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.12);
}

.terminal-bar {
  background: #252525;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.t-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f57;
  flex-shrink: 0;
}
.t-dot:nth-child(2) { background: #febc2e; }
.t-dot:nth-child(3) { background: #28c840; }

.terminal-title {
  margin-left: 8px;
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.terminal-body {
  background: #1a1a1a;
  padding: 20px 24px;
  position: relative;
}

.t-line {
  display: flex;
  align-items: center;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  color: #d4d4d4;
  padding: 3px 0;
  opacity: 0;
  animation: lineIn 0.45s ease-out forwards;
}

@keyframes lineIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}

.t-prompt {
  color: #f0a880;
  margin-right: 10px;
  flex-shrink: 0;
}

.t-cmd {
  flex: 1;
}

.t-copy {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.t-copy:hover {
  color: #ccc;
  background: rgba(255,255,255,0.08);
}

.t-copy.copied {
  color: #28c840;
}

.t-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #e07c54;
  margin-top: 6px;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ================================================================
   FOOTER
   ================================================================ */

.page-footer {
  text-align: center;
  padding: 24px;
  border-top: 1px solid var(--color-border, #f0e0d4);
}

.page-footer p {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin: 0;
}

.page-footer code {
  background: #fef7f2;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
  font-weight: 550;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

@media (max-width: 640px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 40px 20px 32px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 20px;
  }

  .stat-num {
    font-size: 1.6rem;
  }

  .timeline {
    padding-left: 32px;
  }

  .timeline-dot {
    left: -32px;
    width: 30px;
    height: 30px;
  }

  .terminal-body {
    padding: 16px;
  }
}
</style>

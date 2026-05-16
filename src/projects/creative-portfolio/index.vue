<template>
  <div class="showcase">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div v-for="n in 12" :key="n" class="orb" :style="orbStyle(n)" />
      </div>
      <div class="hero-content">
        <div class="hero-icon">🛠️</div>
        <h1 class="hero-title">
          <span v-for="(char, i) in '阿椰菜补丁铺'" :key="i" class="title-char" :style="{ animationDelay: `${i * 0.06}s` }">{{ char }}</span>
        </h1>
        <p class="hero-sub">个人开源项目展示 & 技术方案收录</p>
        <div class="hero-badge-group">
          <span class="badge">Vue 3</span>
          <span class="badge">Vite</span>
          <span class="badge">TypeScript</span>
          <span class="badge">GitHub Pages</span>
        </div>
      </div>
    </section>

    <!-- Feature Cards -->
    <section class="features">
      <div class="feature-card" v-for="(f, i) in features" :key="i" :style="{ animationDelay: `${i * 0.12}s` }">
        <div class="feature-icon-wrap">
          <span class="feature-icon">{{ f.icon }}</span>
        </div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="tech">
      <h2 class="section-title">技术栈</h2>
      <div class="tech-grid">
        <div v-for="t in techs" :key="t.name" class="tech-item">
          <div class="tech-ring" :style="{ '--pct': t.pct }">
            <span class="tech-name">{{ t.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="quickstart">
      <h2 class="section-title">本地运行</h2>
      <div class="terminal">
        <div class="terminal-bar"><span class="dot" /><span class="dot" /><span class="dot" /></div>
        <div class="terminal-body">
          <div v-for="(line, i) in commands" :key="i" class="terminal-line" :style="{ animationDelay: `${i * 0.5}s` }">
            <span class="prompt">$</span> {{ line }}
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="intro-footer">
      <p>推送 <code>main</code> 分支 → GitHub Actions 自动构建部署</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const features = [
  { icon: '📦', title: '模块化架构', desc: '每个项目独立文件夹，组件、样式、资源互不干扰' },
  { icon: '🎨', title: '主题覆盖', desc: '项目级 CSS 变量，进入自动切换，离开恢复' },
  { icon: '📝', title: 'Markdown 文章', desc: '技术方案按目录分类，自动生成索引和目录树' },
  { icon: '⚡', title: '零依赖动画', desc: '纯 CSS 动画 + Intersection Observer，轻量流畅' },
]

const techs = [
  { name: 'Vue 3', pct: '0.85' },
  { name: 'Vite', pct: '0.78' },
  { name: 'TypeScript', pct: '0.72' },
  { name: 'CSS', pct: '0.65' },
]

const commands = [
  'npm install',
  'npm run dev',
  'npm run build',
  'npm run preview',
]

function orbStyle(n: number) {
  const size = 60 + Math.sin(n * 2.3) * 40
  const x = (n * 37 + 13) % 100
  const y = (n * 53 + 7) % 100
  const dur = 6 + (n % 5) * 2
  const delay = -(n * 0.7)
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    top: `${y}%`,
    animationDuration: `${dur}s`,
    animationDelay: `${delay}s`,
    opacity: 0.12 + (n % 4) * 0.04,
  }
}
</script>

<style scoped>
.showcase {
  max-width: 800px;
}

/* ===== Hero ===== */
.hero {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl) var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  background: linear-gradient(135deg, #fdf8f4 0%, #fce4d6 40%, #f8d5b8 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  background: var(--color-primary);
  animation: orbFloat 8s ease-in-out infinite;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(10px, -15px) scale(1.1); }
  50% { transform: translate(-8px, 8px) scale(0.9); }
  75% { transform: translate(-12px, -5px) scale(1.05); }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hero-icon {
  font-size: 3.5rem;
  animation: bounce 2s ease-in-out infinite;
  display: inline-block;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  margin: var(--spacing-md) 0;
  font-size: var(--font-size-3xl);
  font-weight: 800;
}

.title-char {
  display: inline-block;
  animation: charIn 0.5s ease-out both;
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes charIn {
  0% { opacity: 0; transform: translateY(20px) rotateX(90deg); }
  100% { opacity: 1; transform: translateY(0) rotateX(0); }
}

.hero-sub {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  animation: fadeUp 0.6s ease-out 0.8s both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-badge-group {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeUp 0.6s ease-out 1s both;
}

.badge {
  padding: 4px 14px;
  border-radius: var(--radius-full);
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(4px);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-primary-dark);
  border: 1px solid rgba(224,124,84,0.2);
  transition: all 0.3s ease;
}

.badge:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(224,124,84,0.3);
}

/* ===== Feature Cards ===== */
.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.feature-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--color-border, #f0e0d4);
  animation: cardIn 0.5s ease-out both;
  transition: all 0.35s ease;
  cursor: default;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(224,124,84,0.12);
  border-color: var(--color-primary-light);
}

.feature-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon-wrap {
  transform: scale(1.1) rotate(-5deg);
}

.feature-icon {
  font-size: 1.4rem;
}

.feature-card h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.feature-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* ===== Tech Stack ===== */
.tech {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  border-radius: 2px;
  background: var(--color-primary);
  margin: var(--spacing-sm) auto 0;
}

.tech-grid {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.tech-item {
  text-align: center;
}

.tech-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: conic-gradient(
    var(--color-primary) calc(var(--pct) * 360deg),
    #f0e0d4 calc(var(--pct) * 360deg)
  );
  animation: ringFill 1.2s ease-out both;
  animation-delay: 0.3s;
}

@keyframes ringFill {
  from { opacity: 0; transform: scale(0.5) rotate(-60deg); }
  to { opacity: 1; transform: scale(1) rotate(0deg); }
}

.tech-ring::before {
  content: '';
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: var(--color-bg-card);
  position: absolute;
}

.tech-name {
  position: relative;
  z-index: 1;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text);
}

/* ===== Terminal ===== */
.quickstart {
  margin-bottom: var(--spacing-2xl);
}

.terminal {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  animation: fadeUp 0.6s ease-out 0.5s both;
}

.terminal-bar {
  background: #2d2d2d;
  padding: 10px 14px;
  display: flex;
  gap: 7px;
}

.terminal-bar .dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff5f57;
}
.terminal-bar .dot:nth-child(2) { background: #febc2e; }
.terminal-bar .dot:nth-child(3) { background: #28c840; }

.terminal-body {
  background: #1e1e1e;
  padding: var(--spacing-lg) var(--spacing-xl);
}

.terminal-line {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: var(--font-size-sm);
  color: #e0e0e0;
  padding: 4px 0;
  opacity: 0;
  animation: typeIn 0.4s ease-out forwards;
}

@keyframes typeIn {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

.prompt {
  color: var(--color-primary-light);
  margin-right: 8px;
}

/* ===== Footer ===== */
.intro-footer {
  text-align: center;
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border, #f0e0d4);
}

.intro-footer p {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.intro-footer code {
  background: var(--color-bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
}

@media (max-width: 640px) {
  .features {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }
}
</style>

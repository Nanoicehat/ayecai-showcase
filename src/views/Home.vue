<template>
  <section class="hero">
    <div class="hero-shapes">
      <span class="shape shape-circle" />
      <span class="shape shape-triangle" />
      <span class="shape shape-square" />
      <span class="shape shape-circle-sm" />
    </div>
    <div :class="['hero-inner', { visible: heroVisible }]">
      <div class="hero-roles">
        <span class="role-line" />
        <span class="role-text">前端开发者 / 创意极客</span>
        <span class="role-line" />
      </div>
      <h1 class="hero-logo"><span class="hero-emoji">🥬</span>阿椰菜</h1>
      <p class="hero-typing">
        <span class="typing-text">{{ displayText }}</span>
        <span :class="['cursor', { blink: !isTyping }]">|</span>
      </p>
    </div>
  </section>

  <section class="filters">
    <button
      v-for="tag in tagList"
      :key="tag.label"
      :class="['filter-tag', { active: activeTag === tag.label }]"
      @click="toggleTag(tag.label)"
    >
      <span v-if="tag.icon" class="tag-icon">{{ tag.icon }}</span>
      {{ tag.label }}
    </button>
  </section>

  <section v-if="filteredProjects.length" class="project-list">
    <ProjectCard
      v-for="(project, i) in filteredProjects"
      :key="project.slug"
      :project="project"
      :reverse="i % 2 === 1"
      :delay="i * 120"
    />
  </section>

  <section v-else class="empty-state">
    <p>暂无项目</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { projects } from '@/projects/registry'
import { tags } from '@/config/tags'
import { useTypewriter } from '@/composables/useTypewriter'
import ProjectCard from '@/components/ProjectCard.vue'

const heroVisible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { heroVisible.value = true })
})

const { displayText, isTyping } = useTypewriter([
  '用代码探索想法',
  '热爱前端与创意开发',
  '构建有趣的项目',
])

const tagList = tags
const activeTag = ref<string | null>('全部')

const filteredProjects = computed(() => {
  if (!activeTag.value || activeTag.value === '全部') return projects
  const config = tags.find((t) => t.label === activeTag.value)
  if (!config || config.projects.length === 0) return projects
  return projects.filter((p) => config.projects.includes(p.slug))
})

function toggleTag(label: string) {
  activeTag.value = activeTag.value === label ? '全部' : label
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: var(--spacing-3xl) 0 var(--spacing-2xl);
  overflow: hidden;
  position: relative;
}

.hero-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  opacity: 0.12;
  animation: float 7s ease-in-out infinite;
}

.shape-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5b9bd5, #7ec8a4);
  top: 10%;
  left: 8%;
}

.shape-triangle {
  width: 0;
  height: 0;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 60px solid #f0c27a;
  top: 20%;
  right: 10%;
  animation-delay: -2s;
}

.shape-square {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #e07c54;
  bottom: 15%;
  left: 12%;
  animation-delay: -4s;
  transform: rotate(15deg);
}

.shape-circle-sm {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8b5cf6;
  bottom: 25%;
  right: 15%;
  animation-delay: -1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.hero-roles {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.role-line {
  width: 40px;
  height: 1px;
  background: var(--color-text-light);
}

.role-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  letter-spacing: 0.1em;
}

.hero-inner {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero-inner.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-logo {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #5b9bd5 0%, #7ec8a4 40%, #f0c27a 70%, #e07c54 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-md);
  line-height: 1.2;
}

.hero-emoji {
  -webkit-text-fill-color: initial;
  margin-right: 0.1em;
}

.hero-typing {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  min-height: 2em;
}

.typing-text {
  color: var(--color-text);
}

.cursor {
  color: var(--color-primary);
  font-weight: 300;
  margin-left: 2px;
}

.cursor.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  background: var(--color-bg-tag);
  color: var(--color-text-secondary);
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.filter-tag:hover {
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.filter-tag.active {
  background: var(--color-bg-tag-active);
  color: var(--color-text-on-primary);
  box-shadow: 0 2px 8px rgba(91, 155, 213, 0.3);
}

.tag-icon {
  font-size: 1rem;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  color: var(--color-text-light);
  font-size: var(--font-size-lg);
}

@media (prefers-reduced-motion: reduce) {
  .shape {
    animation: none;
  }

  .hero-inner {
    transition: none;
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 640px) {
  .hero-logo {
    font-size: 2.5rem;
  }

  .hero-typing {
    font-size: var(--font-size-base);
  }
}
</style>

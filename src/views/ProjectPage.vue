<template>
  <div v-if="project" class="project-page">
    <header class="project-header">
      <router-link to="/" class="back-link">← 返回项目列表</router-link>
      <h1 class="project-title">{{ project.title }}</h1>
      <p class="project-desc">{{ project.description }}</p>
      <a
        v-if="project.github"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        <svg class="github-icon" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        查看源码
      </a>
    </header>
    <Suspense>
      <template #default>
        <component :is="projectComponent" />
      </template>
      <template #fallback>
        <div class="loading">
          <div class="loading-spinner" />
          <p>加载中...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '@/projects/registry'
import type { ProjectConfig } from '@/types/project'

const route = useRoute()
const router = useRouter()

const project = computed<ProjectConfig | undefined>(() => {
  return projects.find((p) => p.slug === route.params.slug)
})

if (!project.value) {
  router.replace('/')
}

const projectComponent = computed(() => {
  if (!project.value) return null
  const slug = project.value.slug
  return defineAsyncComponent(() => import(`../projects/${slug}/index.vue`))
})

function applyTheme(theme: Record<string, string>) {
  const el = document.documentElement
  Object.entries(theme).forEach(([key, value]) => {
    el.style.setProperty(key, value)
  })
}

function clearTheme(theme: Record<string, string>) {
  const el = document.documentElement
  Object.keys(theme).forEach((key) => {
    el.style.removeProperty(key)
  })
}

onMounted(() => {
  if (project.value?.theme) {
    applyTheme(project.value.theme)
  }
})

onUnmounted(() => {
  if (project.value?.theme) {
    clearTheme(project.value.theme)
  }
})
</script>

<style scoped>
.project-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-header {
  margin-bottom: var(--spacing-2xl);
}

.back-link {
  display: inline-block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.back-link:hover {
  color: var(--color-primary);
}

.project-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}

.project-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--spacing-md);
  padding: 8px 20px;
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-full);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all 0.25s ease;
}

.github-link:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.github-icon {
  width: 18px;
  height: 18px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-3xl) 0;
  color: var(--color-text-light);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

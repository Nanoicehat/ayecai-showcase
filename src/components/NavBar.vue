<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <span class="navbar-icon">🥬</span>
        <span class="navbar-title">阿椰菜</span>
      </router-link>
      <div class="navbar-tabs">
        <router-link
          to="/"
          class="navbar-tab"
          :class="{ active: isProjectsActive }"
        >
          开源项目
        </router-link>
        <router-link
          to="/solutions"
          class="navbar-tab"
          :class="{ active: isSolutionsActive }"
        >
          椰菜优解
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isSolutionsActive = computed(() =>
  route.path.startsWith('/solutions')
)

const isProjectsActive = computed(() =>
  !isSolutionsActive.value
)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background: var(--color-bg-nav);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.navbar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.navbar-brand:hover .navbar-icon {
  transform: rotate(360deg);
}

.navbar-title {
  background: linear-gradient(135deg, #5b9bd5 0%, #7ec8a4 40%, #f0c27a 70%, #e07c54 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-icon {
  font-size: var(--font-size-xl);
  transition: transform 0.6s ease;
}

.navbar-tabs {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.navbar-tab {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.navbar-tab:hover {
  color: var(--color-text);
  background: var(--color-bg-card);
}

.navbar-tab.active {
  color: var(--color-primary, #5b9bd5);
  background: var(--color-bg-card);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

@media (max-width: 640px) {
  .navbar-inner {
    padding: 0 var(--spacing-md);
  }

  .navbar-title {
    font-size: var(--font-size-base);
  }

  .navbar-tab {
    padding: 4px 10px;
    font-size: 13px;
  }
}
</style>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <span class="navbar-icon">✦</span>
        <span class="navbar-title">阿椰菜</span>
      </router-link>
      <router-link v-if="$route.path !== '/'" to="/" class="navbar-back">
        ← 返回
      </router-link>
    </div>
  </nav>
</template>

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
  background: linear-gradient(135deg, #5b9bd5, #e07c54);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: var(--font-size-xl);
  transition: transform 0.6s ease;
}

.navbar-back {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.navbar-back:hover {
  color: var(--color-primary);
}

@media (max-width: 640px) {
  .navbar-inner {
    padding: 0 var(--spacing-md);
  }

  .navbar-title {
    font-size: var(--font-size-base);
  }
}
</style>

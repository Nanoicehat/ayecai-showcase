<template>
  <NavBar />
  <main class="main-content">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.main-content {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  min-height: calc(100vh - var(--nav-height));
}

@media (max-width: 640px) {
  .main-content {
    padding: var(--spacing-lg) var(--spacing-md);
  }
}
</style>

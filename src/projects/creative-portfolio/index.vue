<template>
  <div class="gallery">
    <div class="gallery-grid">
      <div v-for="(item, i) in items" :key="i" class="gallery-item" :class="`size-${item.size}`">
        <div class="gallery-card" :style="{ background: item.color }">
          <div class="gallery-icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { title: '山间日出', category: '摄影', icon: '🏔', color: '#f8e8dc', size: 'large' },
  { title: '抽象流动', category: '插画', icon: '🎨', color: '#fce4d6', size: 'small' },
  { title: '城市线条', category: '摄影', icon: '🏙', color: '#f0d0b8', size: 'small' },
  { title: '海风轻拂', category: '数字艺术', icon: '🌊', color: '#e8d8cc', size: 'medium' },
  { title: '林间小径', category: '摄影', icon: '🌲', color: '#f4e0d0', size: 'medium' },
  { title: '落日余晖', category: '绘画', icon: '🌅', color: '#fce8d8', size: 'large' },
]
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.gallery-card {
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform var(--transition-normal);
}

.gallery-card:hover {
  transform: scale(1.02);
}

.gallery-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
}

.gallery-card h3 {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.gallery-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.size-large {
  grid-column: span 2;
}

.size-large .gallery-card {
  min-height: 240px;
}

@media (max-width: 640px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .size-large {
    grid-column: span 1;
  }
}
</style>

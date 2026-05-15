<template>
  <div class="preview-gallery">
    <!-- Decorative background dots -->
    <span
      v-for="(dot, i) in dots"
      :key="'dot-' + i"
      class="deco-dot"
      :style="{
        width: dot.size + 'px',
        height: dot.size + 'px',
        left: dot.x + '%',
        top: dot.y + '%',
        background: dot.color,
      }"
    />

    <!-- Gallery collage cards -->
    <div
      v-for="(card, i) in cards"
      :key="'card-' + i"
      class="collage-card"
      :style="{
        background: card.color,
        left: card.x + '%',
        top: card.y + '%',
        width: card.w + '%',
        '--rotation': card.rotation + 'deg',
        animationDelay: i * 0.2 + 's',
      }"
    >
      <span class="card-icon">{{ card.icon }}</span>
      <span class="card-label">{{ card.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { icon: '🏔', label: '山间', color: '#f8e8dc', rotation: -3, x: 6, y: 8, w: 38 },
  { icon: '🎨', label: '创作', color: '#fce4d6', rotation: 4, x: 52, y: 4, w: 40 },
  { icon: '🌊', label: '海风', color: '#e8d8cc', rotation: -2, x: 14, y: 52, w: 36 },
  { icon: '🌅', label: '晚霞', color: '#fce8d8', rotation: 5, x: 50, y: 48, w: 42 },
]

const dots = [
  { x: 10, y: 5, size: 8, color: 'rgba(224, 124, 84, 0.1)' },
  { x: 85, y: 15, size: 12, color: 'rgba(200, 140, 100, 0.08)' },
  { x: 5, y: 75, size: 6, color: 'rgba(224, 124, 84, 0.12)' },
  { x: 75, y: 80, size: 10, color: 'rgba(180, 120, 80, 0.1)' },
  { x: 45, y: 90, size: 7, color: 'rgba(224, 160, 120, 0.1)' },
  { x: 90, y: 50, size: 9, color: 'rgba(200, 140, 100, 0.08)' },
]
</script>

<style scoped>
.preview-gallery {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #fdf8f4 0%, #fce4d6 100%);
  border-radius: 8px;
}

.deco-dot {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.collage-card {
  position: absolute;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: scale(0.85) rotate(0deg);
  animation: cardIn 0.5s ease forwards;
  animation-fill-mode: forwards;
}

.card-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.card-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b5344;
  letter-spacing: 0.04em;
}

@keyframes cardIn {
  0% {
    opacity: 0;
    transform: scale(0.85) rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(var(--rotation));
  }
}
</style>

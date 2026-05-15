<template>
  <div
    ref="cardRef"
    :class="['showcase-item', animationClass, { visible: isVisible, reverse: reverse }]"
    :style="showcaseVars"
  >
    <div class="showcase-preview">
      <Suspense v-if="project.hasPreview">
        <template #default>
          <component :is="previewComponent" />
        </template>
        <template #fallback>
          <div class="preview-fallback">
            <img :src="project.coverImage" :alt="project.title" />
          </div>
        </template>
      </Suspense>
      <div v-else class="preview-fallback">
        <img :src="project.coverImage" :alt="project.title" />
      </div>
    </div>
    <div class="showcase-info">
      <div v-if="project.tags?.length" class="showcase-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <h2 class="showcase-title">{{ project.title }}</h2>
      <p class="showcase-desc">{{ project.description }}</p>
      <router-link :to="`/project/${project.slug}`" class="showcase-link">
        查看项目 →
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { ProjectConfig } from '@/types/project'
import { getPresetBySlug } from '@/config/showcase-presets'

const props = defineProps<{
  project: ProjectConfig
  reverse?: boolean
  delay?: number
}>()

const { isVisible } = useScrollReveal('cardRef')

const previewComponent = computed(() => {
  if (!props.project.hasPreview) return null
  const slug = props.project.slug
  return defineAsyncComponent(() => import(`../projects/${slug}/preview.vue`))
})

const effectiveShowcase = computed(() => {
  return props.project.showcase ?? getPresetBySlug(props.project.slug)
})

const animationClass = computed(() => {
  return `anim-${effectiveShowcase.value.animation ?? 'slide-up'}`
})

const showcaseVars = computed(() => {
  const s = effectiveShowcase.value
  const vars: Record<string, string> = {
    transitionDelay: `${props.delay ?? 0}ms`
  }
  if (s.bgGradient) vars['--showcase-bg'] = s.bgGradient
  if (s.accentColor) vars['--showcase-accent'] = s.accentColor
  return vars
})
</script>

<style scoped>
.showcase-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  background: var(--showcase-bg, transparent);
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Animation: slide-up (default) */
.showcase-item.anim-slide-up {
  transform: translateY(40px);
}

/* Animation: slide-left */
.showcase-item.anim-slide-left {
  transform: translateX(-60px);
}

/* Animation: slide-right */
.showcase-item.anim-slide-right {
  transform: translateX(60px);
}

/* Animation: fade-scale */
.showcase-item.anim-fade-scale {
  transform: scale(0.85);
}

/* Animation: rotate-in */
.showcase-item.anim-rotate-in {
  transform: rotate(-5deg) scale(0.9);
}

/* Visible state — all animations resolve to identity */
.showcase-item.visible {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1) rotate(0deg);
}

.showcase-item.reverse {
  direction: rtl;
}

.showcase-item.reverse > * {
  direction: ltr;
}

.showcase-preview {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-card);
  box-shadow: var(--shadow-md);
  aspect-ratio: 4 / 3;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.showcase-item:hover .showcase-preview {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.preview-fallback {
  width: 100%;
  height: 100%;
}

.preview-fallback img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.showcase-info {
  padding: var(--spacing-lg) 0;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.tag {
  font-size: var(--font-size-xs);
  padding: 3px 12px;
  border-radius: var(--radius-full);
  background: var(--showcase-accent, var(--color-bg-tag));
  color: white;
  opacity: 0.85;
}

.showcase-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.showcase-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.showcase-link {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  background: var(--showcase-accent, var(--color-primary));
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.showcase-link:hover {
  opacity: 0.85;
  transform: translateX(4px);
  color: white;
}

@media (prefers-reduced-motion: reduce) {
  .showcase-item {
    transition: none;
    opacity: 1;
    transform: none;
  }

  .showcase-preview {
    transition: none;
  }

  .showcase-item:hover .showcase-preview {
    transform: none;
  }
}

@media (max-width: 768px) {
  .showcase-item {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .showcase-item.reverse {
    direction: ltr;
  }

  .showcase-preview {
    aspect-ratio: 16 / 10;
  }

  .showcase-title {
    font-size: var(--font-size-xl);
  }
}
</style>

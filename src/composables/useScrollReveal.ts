import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue'

export function useScrollReveal(key: string, options?: { threshold?: number; rootMargin?: string }) {
  const elementRef = useTemplateRef<HTMLElement>(key)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px'
      }
    )
    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible }
}

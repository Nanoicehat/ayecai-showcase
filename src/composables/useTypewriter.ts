import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(texts: string[], options?: { typeSpeed?: number; deleteSpeed?: number; pauseDuration?: number }) {
  const displayText = ref('')
  const isTyping = ref(true)
  let timer: ReturnType<typeof setTimeout> | null = null
  let currentIndex = 0
  let charIndex = 0
  let deleting = false

  const typeSpeed = options?.typeSpeed ?? 80
  const deleteSpeed = options?.deleteSpeed ?? 40
  const pauseDuration = options?.pauseDuration ?? 2000

  function tick() {
    const current = texts[currentIndex]

    if (!deleting) {
      displayText.value = current.slice(0, charIndex + 1)
      charIndex++
      if (charIndex >= current.length) {
        isTyping.value = false
        timer = setTimeout(() => {
          deleting = true
          isTyping.value = true
          tick()
        }, pauseDuration)
        return
      }
      timer = setTimeout(tick, typeSpeed)
    } else {
      displayText.value = current.slice(0, charIndex)
      charIndex--
      if (charIndex < 0) {
        deleting = false
        charIndex = 0
        currentIndex = (currentIndex + 1) % texts.length
        timer = setTimeout(tick, typeSpeed)
        return
      }
      timer = setTimeout(tick, deleteSpeed)
    }
  }

  onMounted(() => {
    tick()
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { displayText, isTyping }
}

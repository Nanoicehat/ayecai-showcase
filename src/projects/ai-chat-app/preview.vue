<template>
  <div class="preview-chat">
    <div
      v-for="(msg, i) in messages"
      :key="i"
      :class="['bubble', msg.role]"
      :style="{ animationDelay: `${i * 0.5}s` }"
    >
      <span :class="['bubble-avatar', msg.role === 'user' ? 'glow-user' : 'glow-ai']">
        {{ msg.role === 'user' ? '👤' : '🤖' }}
      </span>
      <span class="bubble-text">{{ msg.text }}</span>
    </div>

    <div
      class="typing-indicator"
      :style="{ animationDelay: `${messages.length * 0.5}s` }"
    >
      <span class="bubble-avatar glow-ai">🤖</span>
      <span class="dots">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
      </span>
    </div>

    <div
      class="bubble assistant streaming-bubble"
      :style="{ animationDelay: `${streamBubbleDelay}s` }"
    >
      <span class="bubble-avatar glow-ai">🤖</span>
      <span
        class="bubble-text streaming-text"
        :style="{ animationDelay: `${streamTextDelay}s` }"
      >
        Vue 3 的新代码组织方式，让逻辑更内聚...
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const messages = [
  { role: 'user', text: '什么是组合式 API？' },
  { role: 'assistant', text: 'Vue 3 的新代码组织方式...' },
  { role: 'user', text: '有什么优势？' },
]

const streamBubbleDelay = messages.length * 0.5 + 1.2
const streamTextDelay = streamBubbleDelay + 0.6
</script>

<style scoped>
.preview-chat {
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, #f5f0ff 0%, #ede9fe 100%);
  overflow: hidden;
}

/* --- Bubble base --- */
.bubble {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 80%;
  opacity: 0;
  transform: scale(0.3) translateY(20px);
  animation: elasticIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.bubble.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

/* --- Avatar --- */
.bubble-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  background: white;
  flex-shrink: 0;
}

.bubble-avatar.glow-user {
  animation: glowPurple 2s ease-in-out infinite;
}

.bubble-avatar.glow-ai {
  animation: glowIndigo 2s ease-in-out infinite;
}

/* --- Bubble text --- */
.bubble-text {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.8rem;
  line-height: 1.4;
}

.bubble.user .bubble-text {
  background: #8b5cf6;
  color: white;
  border-bottom-right-radius: 4px;
}

.bubble.assistant .bubble-text {
  background: white;
  color: #374151;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

/* --- Typing indicator --- */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: scale(0.3) translateY(20px);
  animation: elasticIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.dots {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a78bfa;
  animation: dotWave 1.2s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.15s;
}

.dot:nth-child(3) {
  animation-delay: 0.3s;
}

/* --- Streaming reply bubble --- */
.streaming-text {
  display: inline-block;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: streamReveal 2.5s linear forwards;
}

/* --- Keyframes --- */

@keyframes elasticIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes glowPurple {
  0%, 100% {
    box-shadow: 0 0 4px rgba(139, 92, 246, 0.2);
  }
  50% {
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.25);
  }
}

@keyframes glowIndigo {
  0%, 100% {
    box-shadow: 0 0 4px rgba(99, 102, 241, 0.2);
  }
  50% {
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.25);
  }
}

@keyframes dotWave {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes streamReveal {
  0% {
    max-width: 0;
  }
  100% {
    max-width: 100%;
  }
}
</style>

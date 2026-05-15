<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="chat-messages">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['message', msg.role]"
        >
          <div class="avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</div>
          <div class="bubble">
            <p>{{ msg.content }}</p>
            <span class="time">{{ msg.time }}</span>
          </div>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="输入你的问题..." disabled />
        <button class="send-btn" disabled>发送</button>
      </div>
    </div>

    <aside class="features">
      <h3>功能特性</h3>
      <div v-for="(feat, i) in features" :key="i" class="feature-card">
        <span class="feature-icon">{{ feat.icon }}</span>
        <div>
          <h4>{{ feat.title }}</h4>
          <p>{{ feat.desc }}</p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const messages = [
  { role: 'user', content: '你好！请帮我解释一下什么是 Vue 的组合式 API？', time: '14:20' },
  { role: 'assistant', content: '组合式 API 是 Vue 3 引入的一种新的代码组织方式。它通过 setup() 函数或 <script setup> 语法，让你可以用函数的方式来组织组件逻辑，而不是像选项式 API 那样按类型分散到 data、methods、computed 等选项中。', time: '14:20' },
  { role: 'user', content: '那它相比选项式 API 有什么优势？', time: '14:21' },
  { role: 'assistant', content: '主要有三个优势：1) 更好的逻辑复用——通过组合式函数（composables）可以轻松提取和复用有状态逻辑；2) 更灵活的代码组织——相关逻辑可以放在一起，不用按选项类型分散；3) 更好的类型推导——对 TypeScript 的支持更友好。', time: '14:21' },
  { role: 'user', content: '能给我一个 composable 的例子吗？', time: '14:22' },
  { role: 'assistant', content: '当然！比如一个常见的 useMouse 组合式函数，它可以追踪鼠标位置。你只需在 setup 中调用 const { x, y } = useMouse()，就能获得响应式的鼠标坐标。这个逻辑可以在任何组件中复用，不需要 mixin 或继承。', time: '14:22' },
]

const features = [
  { icon: '💬', title: '多轮对话', desc: '支持上下文关联的连续对话' },
  { icon: '🧠', title: '知识问答', desc: '基于大模型的专业知识回答' },
  { icon: '📝', title: '内容创作', desc: '辅助写作、翻译、摘要生成' },
  { icon: '🔍', title: '代码理解', desc: '代码解释、调试和重构建议' },
]
</script>

<style scoped>
.chat-container {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--spacing-xl);
  align-items: start;
}

.chat-window {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.chat-messages {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-height: 500px;
  overflow-y: auto;
}

.message {
  display: flex;
  gap: var(--spacing-sm);
  align-items: flex-start;
}

.message.assistant {
  flex-direction: row;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  background: var(--color-bg);
}

.bubble {
  max-width: 75%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  line-height: 1.6;
}

.message.user .bubble {
  background: var(--color-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .bubble {
  background: var(--color-bg);
  color: var(--color-text);
  border-bottom-left-radius: 4px;
}

.bubble p {
  font-size: var(--font-size-sm);
  margin: 0;
}

.time {
  display: block;
  font-size: var(--font-size-xs);
  opacity: 0.5;
  margin-top: var(--spacing-xs);
  text-align: right;
}

.chat-input {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.chat-input input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: inherit;
  outline: none;
  background: var(--color-bg);
}

.send-btn {
  padding: 10px 20px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  opacity: 0.6;
}

.features h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.feature-card {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-sm);
}

.feature-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.feature-card h4 {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2px;
}

.feature-card p {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .chat-container {
    grid-template-columns: 1fr;
  }
}
</style>

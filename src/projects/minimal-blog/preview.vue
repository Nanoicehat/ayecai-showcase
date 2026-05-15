<template>
  <div class="preview-blog">
    <div
      v-for="(line, i) in lines"
      :key="i"
      :class="['text-line', line.type]"
      :style="{
        animationDelay: `${i * 0.1}s`,
        width: line.type === 'spacer' ? '100%' : line.width,
      }"
    />
    <div
      class="blog-cursor"
      :style="{ animationDelay: `${lines.length * 0.1 + 0.4}s` }"
    />
  </div>
</template>

<script setup lang="ts">
interface LineItem {
  type: 'title' | 'meta' | 'spacer' | 'body' | 'quote'
  width: string
}

const lines: LineItem[] = [
  { type: 'title', width: '60%' },
  { type: 'meta', width: '30%' },
  { type: 'spacer', width: '0' },
  { type: 'body', width: '92%' },
  { type: 'body', width: '85%' },
  { type: 'body', width: '78%' },
  { type: 'spacer', width: '0' },
  { type: 'quote', width: '80%' },
  { type: 'quote', width: '65%' },
  { type: 'spacer', width: '0' },
  { type: 'body', width: '88%' },
  { type: 'body', width: '72%' },
]
</script>

<style scoped>
.preview-blog {
  width: 100%;
  height: 100%;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fafafa;
  position: relative;
}

.text-line {
  border-radius: 3px;
  opacity: 0;
  transform: translateX(-12px);
  animation: fadeSlide 0.4s ease forwards;
  flex-shrink: 0;
}

.text-line.title {
  height: 14px;
  background: #2c3e50;
  margin-bottom: 4px;
}

.text-line.meta {
  height: 8px;
  background: #94a3b8;
  margin-bottom: 8px;
}

.text-line.body {
  height: 7px;
  background: #cbd5e1;
}

.text-line.quote {
  height: 7px;
  background: #cbd5e1;
  margin-left: 16px;
  border-left: 3px solid #94a3b8;
  border-radius: 0 3px 3px 0;
  padding-left: 8px;
}

.text-line.spacer {
  height: 12px;
  background: transparent;
  animation: none;
  opacity: 1;
  transform: none;
}

.blog-cursor {
  width: 2px;
  height: 14px;
  background: #333;
  opacity: 0;
  flex-shrink: 0;
  animation: cursorAppear 0.01s forwards, blink 1s step-end infinite;
}

@keyframes fadeSlide {
  to {
    opacity: 0.7;
    transform: translateX(0);
  }
}

@keyframes cursorAppear {
  to {
    opacity: 1;
  }
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>

<template>
  <article class="blog">
    <div v-for="post in posts" :key="post.title" class="post">
      <time class="post-date">{{ post.date }}</time>
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <div class="post-meta">
        <span>{{ post.readTime }} 分钟阅读</span>
        <span class="dot" />
        <span>{{ post.category }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const posts = [
  {
    title: '论简约的艺术',
    date: '2025-05-10',
    excerpt: '少即是多。在一个充斥着噪音和干扰的世界里，追求简约本身就是一种态度。这篇文章探讨设计中的极简主义如何带来表达的清晰。',
    readTime: 5,
    category: '设计'
  },
  {
    title: '有意识地编程',
    date: '2025-04-28',
    excerpt: '每一行代码都是一个决策，每一层抽象都是一种取舍。有意识地写代码，意味着不仅要知道该构建什么，还要知道为什么——更重要的是，知道什么不该构建。',
    readTime: 7,
    category: '工程'
  },
  {
    title: 'Web 排版之道',
    date: '2025-04-15',
    excerpt: '好的排版是无形的，伟大的排版是令人难忘的。深入探讨字体选择、行高设置，以及那些让屏幕阅读成为享受而非负担的微妙细节。',
    readTime: 4,
    category: '排版'
  },
  {
    title: '安静的界面',
    date: '2025-03-20',
    excerpt: '最好的界面不会喧宾夺主。它们引导而不强求，告知而不呼喊。我们如何设计尊重注意力的数字空间？',
    readTime: 6,
    category: '设计'
  },
]
</script>

<style scoped>
.blog {
  max-width: 640px;
  margin: 0 auto;
}

.post {
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid var(--color-border);
}

.post:last-child {
  border-bottom: none;
}

.post-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  font-variant-numeric: tabular-nums;
}

.post-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text);
  margin: var(--spacing-sm) 0;
  line-height: 1.3;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.post-title:hover {
  color: var(--color-primary);
}

.post-excerpt {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-md);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-text-light);
}
</style>

<template>
  <div class="solutions-page">
    <header class="solutions-header">
      <h1 class="solutions-title">椰菜优解</h1>
      <p class="solutions-subtitle">技术方案与最佳实践分享</p>
    </header>

    <div v-if="loading" class="solutions-loading">
      <div class="loading-spinner"></div>
    </div>

    <template v-else>
      <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
        <span>📁</span> 目录
      </button>

      <div class="solutions-layout">
        <aside class="solutions-sidebar" :class="{ open: sidebarOpen }">
          <SolutionsTree
            :articles="articles"
            :selected-category="selectedCategory"
            @select="selectCategory"
          />
        </aside>

        <main class="solutions-content">
          <div v-if="selectedCategory" class="filter-indicator">
            <span>📂 {{ selectedCategory }}</span>
            <button class="filter-clear" @click="selectedCategory = ''">✕</button>
          </div>

          <div v-if="filteredArticles.length === 0" class="solutions-empty">
            <p>该目录下暂无文章</p>
          </div>

          <template v-else>
            <div
              class="solutions-grid"
              :style="{ gridTemplateColumns: `repeat(${effectiveColumns}, 1fr)` }"
            >
              <router-link
                v-for="article in pagedArticles"
                :key="article.path"
                :to="`/solutions/${article.path}`"
                class="article-card"
              >
                <div class="article-card-visual">
                  <img
                    :src="getArticleCover(article)"
                    :alt="article.title"
                    class="card-cover-img"
                  />
                </div>
                <div class="article-card-info">
                  <span class="article-category">{{ article.category }}</span>
                  <h2 class="article-title">{{ article.title }}</h2>
                  <p class="article-summary">{{ article.summary }}</p>
                  <div class="article-meta">
                    <time class="article-date">{{ article.date }}</time>
                    <span class="article-read">阅读 →</span>
                  </div>
                </div>
              </router-link>
            </div>

            <div v-if="totalPages > 1" class="pagination">
              <button
                class="page-btn"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                ← 上一页
              </button>
              <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
              <button
                class="page-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                下一页 →
              </button>
            </div>
          </template>
        </main>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import SolutionsTree from '@/components/SolutionsTree.vue'
import { solutionsConfig } from '@/config/solutions'

interface Article {
  title: string
  date: string
  category: string
  summary: string
  slug: string
  path: string
  cover: string
}

const baseUrl = import.meta.env.BASE_URL

const articles = ref<Article[]>([])
const loading = ref(true)
const selectedCategory = ref('')
const sidebarOpen = ref(false)
const currentPage = ref(1)

const effectiveColumns = Math.min(
  Math.max(solutionsConfig.columns, solutionsConfig.columnsMin),
  solutionsConfig.columnsMax
)

const defaultCovers = [
  'solutions/defaults/1.jpg',
  'solutions/defaults/2.jpg',
  'solutions/defaults/3.jpg',
  'solutions/defaults/4.jpg',
  'solutions/defaults/5.jpg',
  'solutions/defaults/6.jpg',
]

function getArticleCover(article: Article): string {
  if (article.cover) return `${baseUrl}${article.cover}`
  const hash = article.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return `${baseUrl}${defaultCovers[hash % defaultCovers.length]}`
}

const filteredArticles = computed(() => {
  if (!selectedCategory.value) return articles.value
  return articles.value.filter(a =>
    a.category === selectedCategory.value ||
    a.category.startsWith(selectedCategory.value + '/')
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredArticles.value.length / solutionsConfig.pageSize)
)

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * solutionsConfig.pageSize
  return filteredArticles.value.slice(start, start + solutionsConfig.pageSize)
})

watch(filteredArticles, () => {
  currentPage.value = 1
})

function selectCategory(path: string) {
  selectedCategory.value = path
  sidebarOpen.value = false
}

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}solutions/index.json`)
    if (res.ok) {
      articles.value = await res.json()
    }
  } catch {
    // silently fail
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.solutions-page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  min-height: calc(100vh - var(--nav-height));
}

.solutions-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
}

.solutions-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #5b9bd5 0%, #7ec8a4 50%, #f0c27a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
}

.solutions-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.solutions-loading {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl) 0;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary, #5b9bd5);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.sidebar-toggle {
  display: none;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg-card, #fff);
  font-size: 14px;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.sidebar-toggle:hover {
  border-color: var(--color-primary, #5b9bd5);
  color: var(--color-primary, #5b9bd5);
}

.solutions-layout {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
}

.solutions-sidebar {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--nav-height) + var(--spacing-lg));
  max-height: calc(100vh - var(--nav-height) - var(--spacing-xl) * 2);
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-bg-card, #fff);
  padding: var(--spacing-sm);
}

.solutions-content {
  flex: 1;
  min-width: 0;
}

.filter-indicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  padding: 8px 14px;
  background: var(--color-bg-card, #f5f5f5);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.filter-clear {
  margin-left: auto;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--color-text-secondary);
  padding: 2px 6px;
  border-radius: 4px;
}

.filter-clear:hover {
  background: var(--color-border);
  color: var(--color-text);
}

.solutions-empty {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.solutions-grid {
  display: grid;
  gap: var(--spacing-lg);
}

.article-card {
  display: block;
  border-radius: 12px;
  background: var(--color-bg-card, #fff);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary, #5b9bd5);
}

.article-card-visual {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
}

.card-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-cover-img {
  transform: scale(1.05);
}

.article-card-info {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.article-category {
  display: inline-block;
  width: fit-content;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #5b9bd5 0%, #7ec8a4 100%);
  color: #fff;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}

.article-summary {
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--color-border);
}

.article-date {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.article-read {
  color: var(--color-primary, #5b9bd5);
  font-size: 12px;
  font-weight: 500;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.page-btn {
  padding: 8px 18px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg-card, #fff);
  font-size: 14px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-primary, #5b9bd5);
  color: var(--color-primary, #5b9bd5);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .solutions-page {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .solutions-title {
    font-size: 1.75rem;
  }

  .sidebar-toggle {
    display: flex;
  }

  .solutions-layout {
    flex-direction: column;
  }

  .solutions-sidebar {
    display: none;
    width: 100%;
    position: static;
    max-height: none;
  }

  .solutions-sidebar.open {
    display: block;
    margin-bottom: var(--spacing-md);
  }

  .solutions-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

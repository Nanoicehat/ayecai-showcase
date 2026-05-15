<template>
  <div class="solution-detail">
    <div
      v-if="coverUrl"
      class="detail-cover-bg"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    ></div>

    <div v-if="loading" class="detail-loading">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="error" class="detail-error">
      <h2>文章未找到</h2>
      <p>{{ error }}</p>
      <router-link to="/solutions" class="back-link">← 返回列表</router-link>
    </div>

    <article v-else class="detail-article">
      <header class="detail-header">
        <router-link to="/solutions" class="back-link">← 返回列表</router-link>
        <div class="detail-meta">
          <span class="detail-category">{{ meta.category }}</span>
          <time class="detail-date">{{ meta.date }}</time>
        </div>
        <h1 class="detail-title">{{ meta.title }}</h1>
      </header>

      <div class="detail-content prose" v-html="htmlContent"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked, Renderer } from 'marked'

const route = useRoute()

const loading = ref(true)
const error = ref('')
const htmlContent = ref('')
const meta = ref({ title: '', date: '', category: '' })
const coverUrl = ref('')

async function loadArticle() {
  loading.value = true
  error.value = ''
  coverUrl.value = ''

  const pathParam = route.params.path as string | string[]
  const fullPath = Array.isArray(pathParam) ? pathParam.join('/') : pathParam
  const segments = fullPath.split('/')
  const slug = segments[segments.length - 1]
  const category = segments.slice(0, -1).join('/')

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}solutions/${fullPath}.md`)
    if (!res.ok) {
      error.value = '无法加载该文章，请检查链接是否正确'
      return
    }

    const text = await res.text()
    const { frontmatter, body } = parseFrontmatter(text)

    meta.value = {
      title: frontmatter.title || slug,
      date: frontmatter.date || '',
      category: frontmatter.category || category
    }

    const indexRes = await fetch(`${import.meta.env.BASE_URL}solutions/index.json`)
    if (indexRes.ok) {
      const articles = await indexRes.json() as { path: string; cover: string; slug: string }[]
      const match2 = articles.find(a => a.path === fullPath)
      if (match2?.cover) {
        coverUrl.value = `${import.meta.env.BASE_URL}${match2.cover}`
      } else {
        const defaultCovers = Array.from({ length: 20 }, (_, i) => `solutions/_default-covers/${i + 1}.jpg`)
        const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
        coverUrl.value = `${import.meta.env.BASE_URL}${defaultCovers[hash % defaultCovers.length]}`
      }
    }

    const baseUrl = import.meta.env.BASE_URL
    const articleDir = fullPath.includes('/') ? fullPath.split('/').slice(0, -1).join('/') : ''
    const imgBase = articleDir ? `${baseUrl}solutions/${articleDir}/` : `${baseUrl}solutions/`

    const renderer = new Renderer()
    renderer.image = ({ href, title, text }) => {
      const resolvedSrc = (href && !/^https?:\/\//.test(href)) ? `${imgBase}${href}` : href
      const titleAttr = title ? ` title="${title}"` : ''
      return `<img src="${resolvedSrc}" alt="${text || ''}"${titleAttr} />`
    }

    htmlContent.value = await marked(body, { renderer })
  } catch {
    error.value = '加载文章时出错'
  } finally {
    loading.value = false
  }
}

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: content }

  const frontmatter: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx > 0) {
      frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
    }
  }
  return { frontmatter, body: match[2] }
}

onMounted(loadArticle)
watch(() => route.params, loadArticle)
</script>

<style scoped>
.solution-detail {
  max-width: 780px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  min-height: calc(100vh - var(--nav-height));
  position: relative;
}

.detail-cover-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 420px;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  opacity: 0.45;
  z-index: -1;
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

.detail-loading {
  display: flex;
  justify-content: center;
  padding: 80px 0;
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

.detail-error {
  text-align: center;
  padding: 80px 0;
}

.detail-error h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.detail-error p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.back-link {
  display: inline-block;
  color: var(--color-primary, #5b9bd5);
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.detail-article {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  padding: var(--spacing-xl);
  backdrop-filter: blur(4px);
}

.detail-header {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.detail-category {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: linear-gradient(135deg, #5b9bd5 0%, #7ec8a4 100%);
  color: #fff;
}

.detail-date {
  color: var(--color-text-secondary);
  font-size: 13px;
}

.detail-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.3;
}

@media (max-width: 640px) {
  .solution-detail {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .detail-title {
    font-size: 1.5rem;
  }
}
</style>

<style>
.prose {
  line-height: 1.8;
  color: var(--color-text);
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 0.75em;
  color: var(--color-text);
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: var(--color-text);
}

.prose p {
  margin-bottom: 1em;
}

.prose a {
  color: var(--color-primary, #5b9bd5);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose a:hover {
  opacity: 0.8;
}

.prose ul, .prose ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.25em;
}

.prose code {
  background: var(--color-bg-card, #f5f5f5);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.prose pre {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 1em 1.25em;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5em;
  font-size: 0.875em;
  line-height: 1.6;
}

.prose pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  color: inherit;
}

.prose table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  font-size: 0.875em;
  overflow-x: auto;
  display: block;
}

.prose th, .prose td {
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  text-align: left;
}

.prose th {
  background: var(--color-bg-card, #f5f5f5);
  font-weight: 600;
}

.prose tr:nth-child(even) td {
  background: var(--color-bg-card, #fafafa);
}

.prose blockquote {
  border-left: 4px solid var(--color-primary, #5b9bd5);
  padding-left: 1em;
  margin: 1.5em 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.prose hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2em 0;
}

.prose img {
  max-width: 100%;
  border-radius: 8px;
}

.prose strong {
  font-weight: 600;
}
</style>

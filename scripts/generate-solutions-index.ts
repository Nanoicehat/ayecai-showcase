import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface ArticleMeta {
  title: string
  date: string
  category: string
  summary: string
  slug: string
  path: string
  cover: string
}

const SOLUTIONS_DIR = path.resolve(__dirname, '../public/solutions')
const OUTPUT_FILE = path.resolve(SOLUTIONS_DIR, 'index.json')

function scanDirectory(dir: string, category = ''): ArticleMeta[] {
  const articles: ArticleMeta[] = []

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    return articles
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subCategory = category ? `${category}/${entry.name}` : entry.name
      articles.push(...scanDirectory(path.join(dir, entry.name), subCategory))
    } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
      const filePath = path.join(dir, entry.name)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      const slug = entry.name.replace(/\.md$/, '')

      const imageExts = ['.jpg', '.jpeg', '.png', '.svg', '.webp']
      let cover = ''
      const matchedExt = imageExts.find(ext => fs.existsSync(path.join(dir, slug + ext)))
      if (matchedExt) {
        cover = category
          ? `solutions/${category}/${slug}${matchedExt}`
          : `solutions/${slug}${matchedExt}`
      }

      articles.push({
        title: data.title || slug,
        date: data.date
          ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date).split('T')[0])
          : '1970-01-01',
        category: data.category || category || 'uncategorized',
        summary: data.summary || '',
        slug,
        path: category ? `${category}/${slug}` : slug,
        cover
      })
    }
  }

  return articles
}

const articles = scanDirectory(SOLUTIONS_DIR)
articles.sort((a, b) => b.date.localeCompare(a.date))

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2), 'utf-8')
console.log(`Generated solutions index: ${articles.length} articles`)

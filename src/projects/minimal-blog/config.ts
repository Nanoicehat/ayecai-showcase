import type { ProjectConfig } from '@/types/project'
import coverImage from './assets/cover.svg'

const config: ProjectConfig = {
  slug: 'minimal-blog',
  title: '极简博客',
  description: '干净的黑白博客布局，专注排版和阅读体验，追求极简美学。',
  tags: ['博客', '排版', '极简'],
  coverImage,
  hasPreview: true,
  theme: {
    '--color-primary': '#333333',
    '--color-primary-light': '#888888',
    '--color-primary-dark': '#111111',
    '--color-bg': '#fafafa',
    '--color-bg-card': '#ffffff'
  },
  showcase: {
    bgGradient: 'linear-gradient(135deg, #fafafa 0%, #eaeaea 100%)',
    accentColor: '#333333',
    animation: 'slide-left'
  },
  github: 'https://github.com/ayecai/minimal-blog'
}

export default config

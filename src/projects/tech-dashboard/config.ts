import type { ProjectConfig } from '@/types/project'
import coverImage from './assets/cover.svg'

const config: ProjectConfig = {
  slug: 'tech-dashboard',
  title: '数据仪表盘',
  description: '冷色调的仪表盘界面，包含数据指标、图表和实时数据可视化展示。',
  tags: ['仪表盘', '数据', 'Vue'],
  coverImage,
  hasPreview: true,
  theme: {
    '--color-primary': '#6366f1',
    '--color-primary-light': '#a5b4fc',
    '--color-primary-dark': '#4338ca',
    '--color-bg': '#f5f5ff',
    '--color-bg-card': '#ffffff'
  },
  showcase: {
    bgGradient: 'linear-gradient(135deg, #f5f5ff 0%, #e0e7ff 100%)',
    accentColor: '#6366f1',
    animation: 'fade-scale'
  },
  github: 'https://github.com/ayecai/tech-dashboard'
}

export default config

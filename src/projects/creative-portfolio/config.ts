import type { ProjectConfig } from '@/types/project'
import coverImage from './assets/cover.svg'

const config: ProjectConfig = {
  slug: 'creative-portfolio',
  title: '阿椰菜补丁铺',
  description: '个人开源项目展示 & 技术方案收录，部署在 GitHub Pages。Vue 3 + Vite + TypeScript，纯 CSS 动画。',
  tags: ['设计', '画廊', '创意'],
  coverImage,
  hasPreview: true,
  theme: {
    '--color-primary': '#e07c54',
    '--color-primary-light': '#f0b89a',
    '--color-primary-dark': '#c25e34',
    '--color-bg': '#fdf8f4',
    '--color-bg-card': '#ffffff'
  },
  showcase: {
    bgGradient: 'linear-gradient(135deg, #fdf8f4 0%, #fce4d6 100%)',
    accentColor: '#e07c54',
    animation: 'slide-right'
  },
  github: 'https://Nanoicehat.github.io/ayecai-showcase/'
}

export default config

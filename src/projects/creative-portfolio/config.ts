import type { ProjectConfig } from '@/types/project'
import coverImage from './assets/cover.svg'

const config: ProjectConfig = {
  slug: 'creative-portfolio',
  title: '创意作品集',
  description: '暖色调的画廊式作品展示，涵盖摄影、插画和数字艺术创作。',
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
  github: 'https://github.com/ayecai/creative-portfolio'
}

export default config

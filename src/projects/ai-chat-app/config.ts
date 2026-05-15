import type { ProjectConfig } from '@/types/project'
import coverImage from './assets/cover.svg'

const config: ProjectConfig = {
  slug: 'ai-chat-app',
  title: 'AI 聊天助手',
  description: '基于大语言模型的智能对话助手，支持多轮对话、上下文理解和知识问答。',
  tags: ['AI', '聊天', '大模型'],
  coverImage,
  hasPreview: true,
  theme: {
    '--color-primary': '#8b5cf6',
    '--color-primary-light': '#c4b5fd',
    '--color-primary-dark': '#6d28d9',
    '--color-bg': '#f5f0ff',
    '--color-bg-card': '#ffffff'
  },
  showcase: {
    bgGradient: 'linear-gradient(135deg, #f5f0ff 0%, #ede9fe 100%)',
    accentColor: '#8b5cf6',
    animation: 'rotate-in'
  },
  github: 'https://github.com/ayecai/ai-chat-app'
}

export default config

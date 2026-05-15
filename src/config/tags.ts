export interface TagConfig {
  label: string
  icon?: string
  projects: string[]
}

export const tags: TagConfig[] = [
  { label: '全部', icon: '📦', projects: [] },
  { label: '前端', icon: '🎨', projects: ['creative-portfolio', 'minimal-blog'] },
  { label: '数据', icon: '📊', projects: ['tech-dashboard'] },
  { label: 'AI', icon: '🤖', projects: ['ai-chat-app'] },
]

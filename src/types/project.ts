export interface ProjectTheme {
  [key: string]: string
}

export interface ShowcaseStyle {
  bgGradient: string
  accentColor: string
  animation?: 'slide-up' | 'slide-left' | 'slide-right' | 'fade-scale' | 'rotate-in'
}

export interface ProjectConfig {
  slug: string
  title: string
  description: string
  tags?: string[]
  coverImage: string
  theme?: ProjectTheme
  hasPreview?: boolean
  showcase?: ShowcaseStyle
  github?: string
}

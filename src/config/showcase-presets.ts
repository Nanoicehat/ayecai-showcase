import type { ShowcaseStyle } from '@/types/project'

export const showcasePresets: ShowcaseStyle[] = [
  {
    bgGradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    accentColor: '#667eea',
    animation: 'slide-up',
  },
  {
    bgGradient: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
    accentColor: '#d4a574',
    animation: 'slide-right',
  },
  {
    bgGradient: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
    accentColor: '#00acc1',
    animation: 'fade-scale',
  },
  {
    bgGradient: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
    accentColor: '#ab47bc',
    animation: 'slide-left',
  },
  {
    bgGradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    accentColor: '#43a047',
    animation: 'rotate-in',
  },
  {
    bgGradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    accentColor: '#fb8c00',
    animation: 'slide-up',
  },
  {
    bgGradient: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    accentColor: '#e91e63',
    animation: 'fade-scale',
  },
  {
    bgGradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    accentColor: '#1e88e5',
    animation: 'slide-right',
  },
  {
    bgGradient: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)',
    accentColor: '#7cb342',
    animation: 'slide-left',
  },
  {
    bgGradient: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)',
    accentColor: '#5e35b1',
    animation: 'rotate-in',
  },
]

export function getPresetBySlug(slug: string): ShowcaseStyle {
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return showcasePresets[hash % showcasePresets.length]
}

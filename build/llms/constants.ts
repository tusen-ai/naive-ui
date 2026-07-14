import type { Category, Locale, Theme } from './types'

export const categories: Category[] = ['docs', 'components']
export const locales: Locale[] = ['en-US', 'zh-CN']
export const themes: Theme[] = ['light', 'dark', 'os-theme']
export const llmsFiles: string[] = ['llms.txt', 'llms-full.txt']
export const SKIP_ROUTES = new Set(['from-v1'])

export const i18n: Record<
  Locale,
  {
    description: string
    docs: string
    components: string
  }
> = {
  'en-US': {
    description:
      '> A Vue 3 Component Library. Fairly Complete, Theme Customizable, Uses TypeScript, Fast.',
    docs: 'Docs',
    components: 'Components'
  },
  'zh-CN': {
    description:
      '> 一个 Vue 3 组件库。比较完整，主题可调，使用 TypeScript，快。',
    docs: '文档',
    components: '组件'
  }
}

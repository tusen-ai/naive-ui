import type { ThemePreset } from '../../themePresets'
import { shadcnDarkOverrides } from './dark'
import { shadcnLightOverrides } from './light'

export const shadcnPreset: ThemePreset = {
  name: 'shadcn/ui',
  nameEn: 'shadcn/ui',
  author: 'Naive UI',
  description: '基于 shadcn/ui 设计系统',
  descriptionEn: 'Based on shadcn/ui design system',
  overrides: shadcnLightOverrides,
  darkOverrides: shadcnDarkOverrides
}

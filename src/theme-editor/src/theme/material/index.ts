import type { ThemePreset } from '../../themePresets'
import { materialDarkOverrides } from './dark'
import { materialLightOverrides } from './light'

export const materialPreset: ThemePreset = {
  name: 'Material Design',
  nameEn: 'Material Design',
  author: 'Naive UI',
  description: '基于 Material Design 3 设计规范',
  descriptionEn: 'Based on Material Design 3 specifications',
  overrides: materialLightOverrides,
  darkOverrides: materialDarkOverrides
}

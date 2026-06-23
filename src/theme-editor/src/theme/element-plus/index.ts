import type { ThemePreset } from '../../themePresets'
import { elementPlusDarkOverrides } from './dark'
import { elementPlusLightOverrides } from './light'

export const elementPlusPreset: ThemePreset = {
  name: 'Element Plus',
  nameEn: 'Element Plus',
  author: 'Naive UI',
  description: '基于 Element Plus 设计规范',
  descriptionEn: 'Based on Element Plus specifications',
  overrides: elementPlusLightOverrides,
  darkOverrides: elementPlusDarkOverrides
}

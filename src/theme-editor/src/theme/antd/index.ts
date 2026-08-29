import type { ThemePreset } from '../../themePresets'
import { antdDarkOverrides } from './dark'
import { antdLightOverrides } from './light'

export const antdPreset: ThemePreset = {
  name: 'Ant Design',
  nameEn: 'Ant Design',
  author: 'Naive UI',
  description: '基于 Ant Design v6 设计规范',
  descriptionEn: 'Based on Ant Design v6 specifications',
  overrides: antdLightOverrides,
  darkOverrides: antdDarkOverrides
}

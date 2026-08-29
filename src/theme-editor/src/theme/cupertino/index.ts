import type { ThemePreset } from '../../themePresets'
import { cupertinoDarkOverrides } from './dark'
import { cupertinoLightOverrides } from './light'

export const cupertinoPreset: ThemePreset = {
  name: 'Cupertino',
  nameEn: 'Cupertino',
  author: 'Naive UI',
  description: '基于 Cupertino 设计规范',
  descriptionEn: 'Based on Cupertino specifications',
  overrides: cupertinoLightOverrides,
  darkOverrides: cupertinoDarkOverrides
}

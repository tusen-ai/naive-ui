import type { ThemePreset } from '../../themePresets'
import { auroraDarkOverrides } from './dark'
import { auroraLightOverrides } from './light'

export const auroraPreset: ThemePreset = {
  name: 'Aurora',
  nameEn: 'Aurora',
  author: 'jahnli',
  description: '极光紫风格，简洁，现代',
  descriptionEn: 'Aurora gradient style, simple, modern',
  overrides: auroraLightOverrides,
  darkOverrides: auroraDarkOverrides
}

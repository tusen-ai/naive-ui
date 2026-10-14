import type { GlobalThemeOverrides } from '../../config-provider'
import { antdPreset } from './theme/antd'
import { auroraPreset } from './theme/aurora'
import { cupertinoPreset } from './theme/cupertino'
import { elementPlusPreset } from './theme/element-plus'
import { materialPreset } from './theme/material'
import { shadcnPreset } from './theme/shadcn'

export interface ThemePreset {
  name: string
  nameEn: string
  author: string
  description: string
  descriptionEn: string
  overrides: GlobalThemeOverrides
  darkOverrides?: GlobalThemeOverrides
}

export const themePresets: ThemePreset[] = [
  materialPreset,
  cupertinoPreset,
  antdPreset,
  elementPlusPreset,
  shadcnPreset,
  auroraPreset
]

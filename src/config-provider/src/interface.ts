import type { ThemeCommonVars } from '../../_styles/common'
import type { ExtractThemeOverrides } from '../../_mixins/use-theme'
import type { GlobalThemeWithoutCommon } from './internal-interface'

export type { ThemeCommonVars }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomThemeCommonVars {}

export interface GlobalTheme extends GlobalThemeWithoutCommon {
  name: string
  common?: ThemeCommonVars
}

export type GlobalThemeOverrides = {
  common?: Partial<ThemeCommonVars & CustomThemeCommonVars>
} & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<
  GlobalThemeWithoutCommon[key]
  >
}

export type {
  GlobalIconConfig,
  GlobalComponentConfig
} from './internal-interface'

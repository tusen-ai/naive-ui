import type { ThemeCommonVars } from '../../_styles/common'
import type { ExtractThemeOverrides } from '../../_mixins/use-theme'
import type { GlobalThemeWithoutCommon } from './internal-interface'

export interface GlobalTheme extends GlobalThemeWithoutCommon {
  common?: ThemeCommonVars
}

export type GlobalThemeOverrides = {
  common?: Partial<ThemeCommonVars>
} & {
  [key in keyof GlobalThemeWithoutCommon]?: ExtractThemeOverrides<
  GlobalThemeWithoutCommon[key]
  >
}

export type {
  GlobalIconConfig,
  GlobalComponentConfig
} from './internal-interface'

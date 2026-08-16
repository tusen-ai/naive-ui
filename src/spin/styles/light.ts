import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const {
    opacityDisabled,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    primaryColor,
    fontSize
  } = vars
  return {
    fontSize,
    textColor: primaryColor,
    sizeTiny: heightTiny,
    sizeSmall: heightSmall,
    sizeMedium: heightMedium,
    sizeLarge: heightLarge,
    sizeHuge: heightHuge,
    color: primaryColor,
    opacitySpinning: opacityDisabled
  }
}

export interface SpinThemeVars extends ReturnType<typeof self> {}

const spinLight: SpinTheme = {
  name: 'Spin',
  common: commonLight,
  self
}

export interface SpinTheme extends Theme<'Spin', SpinThemeVars> {}

export interface SpinThemeOverrides extends ExtractThemeOverrides<SpinTheme> {}

export default spinLight

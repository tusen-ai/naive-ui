import { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'

const self = (vars: ThemeCommonVars) => {
  const {
    opacityDisabled,
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    heightHuge,
    primaryColor
  } = vars
  return {
    sizeTiny: heightTiny,
    sizeSmall: heightSmall,
    sizeMedium: heightMedium,
    sizeLarge: heightLarge,
    sizeHuge: heightHuge,
    color: primaryColor,
    opacitySpinning: opacityDisabled
  }
}

export type SpinThemeVars = ReturnType<typeof self>

const spinLight: Theme<'Spin', SpinThemeVars> = {
  name: 'Spin',
  common: commonLight,
  self
}

export default spinLight
export type SpinTheme = typeof spinLight

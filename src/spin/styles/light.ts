import { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'

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

const spinLight: Theme<SpinThemeVars> = {
  name: 'Spin',
  common: commonLight,
  self
}

export default spinLight
export type SpinTheme = typeof spinLight

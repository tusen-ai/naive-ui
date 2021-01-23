import sizeVariables from './_common'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const indicatorColor = 'rgba(0, 0, 0, .85)'
  const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
  const {
    railColorOverlay,
    primaryColor,
    baseColor,
    cardColor,
    borderRadius,
    fontSize
  } = vars
  return {
    ...sizeVariables,
    fontSize,
    railColor: railColorOverlay,
    railColorHover: railColorOverlay,
    fillColor: primaryColor,
    fillColorHover: primaryColor,
    handleColor: '#FFF',
    dotColor: cardColor,
    dotColorModal: baseColor,
    handleBoxShadow:
      '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    handleBoxShadowHover:
      '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    handleBoxShadowActive:
      '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    handleBoxShadowFocus:
      '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
    indicatorColor: indicatorColor,
    indicatorBoxShadow: boxShadow,
    indicatorTextColor: baseColor,
    indicatorBorderRadius: borderRadius,
    dotBorder: `2px solid ${railColorOverlay}`,
    dotBorderActive: `2px solid ${primaryColor}`,
    dotBoxShadow: null
  }
}

export type SliderThemeVars = ReturnType<typeof self>

const sliderLight: Theme<SliderThemeVars> = {
  name: 'Slider',
  common: commonLight,
  self
}

export default sliderLight
export type SliderTheme = typeof sliderLight

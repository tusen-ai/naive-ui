import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    baseColor,
    inputColorDisabled,
    cardColor,
    modalColor,
    textColorDisabled,
    borderColor,
    primaryColor,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall
  } = vars
  return {
    ...commonVariables,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorActive: primaryColor,
    colorDisabled: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderActive: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    textColor: textColor2,
    textColorDisabled: textColorDisabled
  }
}

export type CheckboxThemeVars = ReturnType<typeof self>

const checkboxLight: Theme<CheckboxThemeVars> = {
  name: 'Checkbox',
  common: commonLight,
  self
}

export default checkboxLight
export type CheckboxTheme = typeof checkboxLight

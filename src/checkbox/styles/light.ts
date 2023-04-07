import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    baseColor,
    inputColorDisabled,
    cardColor,
    modalColor,
    popoverColor,
    textColorDisabled,
    borderColor,
    primaryColor,
    textColor2,
    opacityDisabled,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall,
    heightSmall,
    heightMedium,
    heightLarge,
    lineHeight
  } = vars
  return {
    ...commonVariables,
    buttonHeightSmall: heightSmall,
    buttonHeightMedium: heightMedium,
    buttonHeightLarge: heightLarge,
    labelLineHeight: lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorChecked: primaryColor,
    colorDisabled: inputColorDisabled,
    colorDisabledChecked: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    colorTableHeaderPopover: popoverColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    checkMarkColorDisabledChecked: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderDisabledChecked: `1px solid ${borderColor}`,
    borderChecked: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    textColor: textColor2,
    textColorDisabled,
    buttonBorderColor: borderColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColor: textColor2,
    buttonTextColorActive: primaryColor,
    buttonTextColorHover: primaryColor,
    opacityDisabled,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
      primaryColor,
      { alpha: 0.3 }
    )}`,
    buttonBoxShadowHover: 'inset 0 0 0 1px #0000',
    buttonBoxShadow: 'inset 0 0 0 1px #0000',
    buttonBorderRadius: borderRadius
  }
}

export type CheckboxThemeVars = ReturnType<typeof self>

const checkboxLight: Theme<'Checkbox', CheckboxThemeVars> = {
  name: 'Checkbox',
  common: commonLight,
  self
}

export default checkboxLight
export type CheckboxTheme = typeof checkboxLight

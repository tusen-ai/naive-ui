import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
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
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall,
    lineHeight,
    opacityDisabled
  } = vars
  return {
    ...commonVariables,
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
    // button vars
    buttonColor: baseColor,
    buttonColorActive: '#0000',
    buttonColorHover: '#0000',
    buttonColorPressed: '#0000',
    buttonTextColor: textColor2,
    buttonTextColorActive: primaryColor,
    buttonTextColorHover: primaryColor,
    buttonTextColorPressed: primaryColor,
    buttonBorderColor: borderColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonBoxShadow: 'inset 0 0 0 1px #0000',
    buttonBoxShadowHover: 'inset 0 0 0 1px #0000',
    buttonBoxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    buttonBorderRadius: borderRadiusSmall,
    opacityDisabled
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

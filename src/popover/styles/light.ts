import type { Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    boxShadow2,
    popoverColor,
    textColor2,
    borderRadius,
    fontSize,
    dividerColor
  } = vars
  return {
    ...commonVariables,
    fontSize,
    borderRadius,
    color: popoverColor,
    dividerColor,
    textColor: textColor2,
    boxShadow: boxShadow2
  }
}

export type PopoverThemeVars = ReturnType<typeof self>

const popoverLight: Theme<'Popover', PopoverThemeVars> = {
  name: 'Popover',
  common: commonLight,
  self
}

export type PopoverTheme = typeof popoverLight
export default popoverLight

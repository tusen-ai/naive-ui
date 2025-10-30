import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
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

const popoverLight = createTheme({
  name: 'Popover',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export type PopoverTheme = typeof popoverLight
export default popoverLight

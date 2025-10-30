import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    popoverColor,
    textColor2,
    primaryColor,
    hoverColor,
    dividerColor,
    opacityDisabled,
    boxShadow2,
    borderRadius,
    iconColor,
    iconColorDisabled
  } = vars
  return {
    ...commonVars,
    panelColor: popoverColor,
    panelBoxShadow: boxShadow2,
    panelDividerColor: dividerColor,
    itemTextColor: textColor2,
    itemTextColorActive: primaryColor,
    itemColorHover: hoverColor,
    itemOpacityDisabled: opacityDisabled,
    itemBorderRadius: borderRadius,
    borderRadius,
    iconColor,
    iconColorDisabled
  }
}

export type TimePickerThemeVars = ReturnType<typeof self>

const timePickerLight = createTheme({
  name: 'TimePicker',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Button: buttonLight,
    Input: inputLight
  },
  self
})

export default timePickerLight
export type TimePickerTheme = typeof timePickerLight

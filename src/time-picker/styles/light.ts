import commonVars from './_common'
import { scrollbarLight } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { createTheme } from '../../_mixins'
import { inputLight } from '../../input/styles'

const self = (vars: ThemeCommonVars) => {
  const {
    modalColor,
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
    panelColor: modalColor,
    panelBoxShadow: boxShadow2,
    panelDividerColor: dividerColor,
    itemTextColor: textColor2,
    itemTextColorActive: primaryColor,
    itemColorHover: hoverColor,
    itemOpacityDisabled: opacityDisabled,
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

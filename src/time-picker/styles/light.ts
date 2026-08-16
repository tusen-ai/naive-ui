import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
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

export interface TimePickerThemeVars extends ReturnType<typeof self> {}

const timePickerLight: TimePickerTheme = createTheme({
  name: 'TimePicker',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Button: buttonLight,
    Input: inputLight
  },
  self
})

export interface TimePickerTheme extends Theme<
  'TimePicker',
  TimePickerThemeVars,
  {
    Scrollbar: ScrollbarTheme
    Button: ButtonTheme
    Input: InputTheme
  }
> {}

export interface TimePickerThemeOverrides extends ExtractThemeOverrides<TimePickerTheme> {}

export default timePickerLight

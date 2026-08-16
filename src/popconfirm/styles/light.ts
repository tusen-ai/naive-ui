import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { ButtonTheme } from '../../button/styles'
import type { PopoverTheme } from '../../popover/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { popoverLight } from '../../popover/styles'

import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
  const { fontSize, warningColor } = vars
  return {
    ...commonVars,
    fontSize,
    iconColor: warningColor
  }
}

export interface PopconfirmThemeVars extends ReturnType<typeof self> {}

const popconfirmLight: PopconfirmTheme = createTheme({
  name: 'Popconfirm',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Popover: popoverLight
  },
  self
})

export interface PopconfirmTheme extends Theme<
  'Popconfirm',
  PopconfirmThemeVars,
  {
    Button: ButtonTheme
    Popover: PopoverTheme
  }
> {}

export interface PopconfirmThemeOverrides extends ExtractThemeOverrides<PopconfirmTheme> {}

export default popconfirmLight

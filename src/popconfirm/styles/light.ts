import { buttonLight } from '../../button/styles'
import { popoverLight } from '../../popover/styles'
import { createTheme } from '../../_mixins'
import { commonLight, type ThemeCommonVars } from '../../_styles/common'

import commonVars from './_common'

export const self = (vars: ThemeCommonVars) => {
  const { fontSize, warningColor } = vars
  return {
    ...commonVars,
    fontSize,
    iconColor: warningColor
  }
}

export type PopconfirmThemeVars = ReturnType<typeof self>

const popconfirmLight = createTheme({
  name: 'Popconfirm',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Popover: popoverLight
  },
  self
})

export default popconfirmLight
export type PopconfirmTheme = typeof popconfirmLight

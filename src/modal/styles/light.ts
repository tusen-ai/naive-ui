import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { cardLight } from '../../card/styles'
import { dialogLight } from '../../dialog/styles'

export function self(vars: ThemeCommonVars) {
  const { modalColor, textColor2, boxShadow3 } = vars
  return {
    color: modalColor,
    textColor: textColor2,
    boxShadow: boxShadow3
  }
}

export type ModalThemeVars = ReturnType<typeof self>

const modalLight = createTheme({
  name: 'Modal',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Dialog: dialogLight,
    Card: cardLight
  },
  self
})

export default modalLight
export type ModalTheme = typeof modalLight

import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { CardTheme } from '../../card/styles'
import type { DialogTheme } from '../../dialog/styles'
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

export interface ModalThemeVars extends ReturnType<typeof self> {}

const modalLight: ModalTheme = createTheme({
  name: 'Modal',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Dialog: dialogLight,
    Card: cardLight
  },
  self
})

export interface ModalTheme extends Theme<
  'Modal',
  ModalThemeVars,
  {
    Scrollbar: ScrollbarTheme
    Dialog: DialogTheme
    Card: CardTheme
  }
> {}

export interface ModalThemeOverrides extends ExtractThemeOverrides<ModalTheme> {}

export default modalLight

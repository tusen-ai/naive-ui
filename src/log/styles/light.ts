import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { codeLight } from '../../code/styles'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { textColor2, modalColor, borderColor, fontSize, primaryColor } = vars
  return {
    loaderFontSize: fontSize,
    loaderTextColor: textColor2,
    loaderColor: modalColor,
    loaderBorder: `1px solid ${borderColor}`,
    loadingColor: primaryColor
  }
}

export type LogThemeVars = ReturnType<typeof self>

const logLight = createTheme({
  name: 'Log',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Code: codeLight
  },
  self
})

export default logLight
export type LogTheme = typeof logLight

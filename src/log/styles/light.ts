import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { CodeTheme } from '../../code/styles'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { codeLight } from '../../code/styles'

function self(vars: ThemeCommonVars) {
  const { textColor2, modalColor, borderColor, fontSize, primaryColor } = vars
  return {
    loaderFontSize: fontSize,
    loaderTextColor: textColor2,
    loaderColor: modalColor,
    loaderBorder: `1px solid ${borderColor}`,
    loadingColor: primaryColor
  }
}

export interface LogThemeVars extends ReturnType<typeof self> {}

const logLight: LogTheme = createTheme({
  name: 'Log',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Code: codeLight
  },
  self
})

export interface LogTheme extends Theme<
  'Log',
  LogThemeVars,
  {
    Scrollbar: ScrollbarTheme
    Code: CodeTheme
  }
> {}

export interface LogThemeOverrides extends ExtractThemeOverrides<LogTheme> {}

export default logLight

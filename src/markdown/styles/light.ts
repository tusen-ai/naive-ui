import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const {
    primaryColor,
    fontSize,
    lineHeight,
    dividerColor,
    tagColor
  } = vars
  return {
    fontSize,
    lineHeight,
    hrColor: dividerColor,
    ulPadding: '0 0 0 2em',
    olPadding: '0 0 0 2em',
    aTextColor: primaryColor,
    tagColor,
    codePadding: '0 7px',
    theadBgColor: 'rgba(0, 0, 0, 0.015)',
    thPaddingMedium: '12px',
    tdPaddingMedium: '12px'
  }
}

export type MarkdownThemeVars = ReturnType<typeof self>

const markdownLight: Theme<'Markdown', MarkdownThemeVars> = {
  name: 'Markdown',
  common: commonLight,
  self
}

export default markdownLight
export type MarkdownTheme = typeof markdownLight

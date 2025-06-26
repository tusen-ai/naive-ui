import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
  const { primaryColor, fontSize, lineHeight, dividerColor, tagColor } = vars
  return {
    ...commonVars,
    fontSize,
    lineHeight,
    hrColor: dividerColor,
    aTextColor: primaryColor,
    tagColor
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

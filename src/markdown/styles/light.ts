import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const {
    fontSize,
    lineHeight
  } = vars
  return {
    fontSize,
    lineHeight
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

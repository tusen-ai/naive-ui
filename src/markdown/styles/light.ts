import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import { avatarLight } from '../../avatar/styles'

export function self(vars: ThemeCommonVars) {
  // eslint-disable-next-line no-empty-pattern
  const {
    //
  } = vars
  return {
  }
}

export type MarkdownThemeVars = ReturnType<typeof self>

const markdownLight: Theme<'Markdown', MarkdownThemeVars> = {
  name: 'Markdown',
  common: commonLight,
  peers: {
    avatar: avatarLight
  },
  self
}

export default markdownLight
export type MarkdownTheme = typeof markdownLight

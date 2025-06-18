import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import { avatarLight } from '../../avatar/styles'

export function self(vars: ThemeCommonVars) {
  const {
  } = vars
  return {
  }
}

export type TypingBubbleThemeVars = ReturnType<typeof self>

const typingBubbleLight: Theme<'Bubble', TypingBubbleThemeVars> = {
  name: 'Bubble',
  common: commonLight,
  peers: {
    avatar: avatarLight
  },
  self
}

export default typingBubbleLight
export type TypingBubbleTheme = typeof typingBubbleLight

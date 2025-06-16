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

export type BubbleThemeVars = ReturnType<typeof self>

const bubbleLight: Theme<'Bubble', BubbleThemeVars> = {
  name: 'Bubble',
  common: commonLight,
  peers: {
    avatar: avatarLight
  },
  self
}

export default bubbleLight
export type BubbleTheme = typeof bubbleLight

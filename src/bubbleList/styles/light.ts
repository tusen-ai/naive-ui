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

export type BubbleListThemeVars = ReturnType<typeof self>

const bubbleListLight: Theme<'Bubble', BubbleListThemeVars> = {
  name: 'Bubble',
  common: commonLight,
  peers: {
    avatar: avatarLight
  },
  self
}

export default bubbleListLight
export type BubbleListTheme = typeof bubbleListLight

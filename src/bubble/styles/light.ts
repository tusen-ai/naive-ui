import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import { avatarLight } from '../../avatar/styles'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  const { fontSize, lineHeight } = vars
  return {
    ...commonVariables,
    fontSize,
    lineHeight,
    filledBackgroundColor: '#f0f2f5',
    outlinedBorder: '1px solid #dcdfe6',
    shadowBoxShadow:
      '0px 12px 32px 4px rgba(0,0,0,.04),0px 8px 20px rgba(0,0,0,.08)'
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

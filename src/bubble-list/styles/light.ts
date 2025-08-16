import type { Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

export function self(vars: ThemeCommonVars) {
  // eslint-disable-next-line no-empty-pattern
  const {
    // next version maybe add more variables
  } = vars
  return {
    ...commonVariables
  }
}

export type BubbleListThemeVars = ReturnType<typeof self>

const bubbleListLight: Theme<'BubbleList', BubbleListThemeVars> = {
  name: 'BubbleList',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
}

export default bubbleListLight
export type BubbleListTheme = typeof bubbleListLight

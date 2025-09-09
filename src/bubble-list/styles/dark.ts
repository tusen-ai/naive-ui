import type { BubbleListTheme } from './light'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const bubbleListDark: BubbleListTheme = {
  name: 'BubbleList',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self(vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default bubbleListDark

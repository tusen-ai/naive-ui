import { commonDark } from '../../_styles/common'
import { tooltipDark } from '../../tooltip/styles'
import type { EllipsisTheme } from './light'

const ellipsisDark: EllipsisTheme = {
  name: 'Ellipsis',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark
  }
}

export default ellipsisDark

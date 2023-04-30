import { commonDark } from '../../_styles/common'
import { type EllipsisTheme } from './light'
import { tooltipDark } from '../../tooltip/styles'

const ellipsisDark: EllipsisTheme = {
  name: 'Ellipsis',
  common: commonDark,
  peers: {
    Tooltip: tooltipDark
  }
}

export default ellipsisDark

import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { tooltipLight } from '../../tooltip/styles'

const ellipsisLight = createTheme({
  name: 'Ellipsis',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  }
})

export default ellipsisLight
export type EllipsisTheme = typeof ellipsisLight

import { iconLight } from '../../icon/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Rate',
  common: commonLight,
  peers: {
    Icon: iconLight
  },
  self (vars) {
    const { railColor } = vars
    return {
      itemColor: railColor,
      itemColorActive: '#FFCC33',
      itemSize: '20px'
    }
  }
}

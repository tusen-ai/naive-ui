import { iconDark } from '../../icon/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Rate',
  common: commonDark,
  peers: {
    Icon: iconDark
  },
  self (vars) {
    const { railColor } = vars
    return {
      itemColor: railColor,
      itemColorActive: '#CCAA33',
      itemSize: '20px'
    }
  }
}

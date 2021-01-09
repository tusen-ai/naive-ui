import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Rate',
  common: commonDark,
  self (vars) {
    const { railColor } = vars
    return {
      itemColor: railColor,
      itemColorActive: '#CCAA33',
      itemSize: '20px'
    }
  }
}

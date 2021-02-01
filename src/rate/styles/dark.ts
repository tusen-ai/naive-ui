import { commonDark } from '../../_styles/common'
import { RateTheme } from './light'

const rateDark: RateTheme = {
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

export default rateDark

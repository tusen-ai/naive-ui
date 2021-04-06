import { commonDark } from '../../_styles/common'
import type { BadgeTheme } from './light'

const badgeDark: BadgeTheme = {
  name: 'Badge',
  common: commonDark,
  self (vars) {
    const {
      errorColorSuppl,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      fontFamily
    } = vars
    return {
      color: errorColorSuppl,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl,
      fontSize: '12px',
      fontFamily
    }
  }
}

export default badgeDark

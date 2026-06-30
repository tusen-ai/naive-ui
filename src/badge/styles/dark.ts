import type { BadgeTheme } from './light'
import { commonDark } from '../../_styles/common'

const badgeDark: BadgeTheme = {
  name: 'Badge',
  common: commonDark,
  self(vars) {
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
      textColor: '#FFF',
      fontSize: '12px',
      fontFamily
    }
  }
}

export default badgeDark

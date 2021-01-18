import { commonDark } from '../../_styles/new-common'
import type { BadgeTheme } from './light'

const badgeDark: BadgeTheme = {
  name: 'Badge',
  common: commonDark,
  self (vars) {
    const {
      errorColorSuppl,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl
    } = vars
    return {
      color: errorColorSuppl,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl
    }
  }
}

export default badgeDark

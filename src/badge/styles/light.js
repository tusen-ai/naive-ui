import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Badge',
  common: commonLight,
  self (vars) {
    const { errorColor, infoColor, successColor, warningColor } = vars
    return {
      color: errorColor,
      colorInfo: infoColor,
      colorSuccess: successColor,
      colorError: errorColor,
      colorWarning: warningColor
    }
  }
}

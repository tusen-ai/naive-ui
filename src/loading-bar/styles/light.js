import { commonLight } from '../../_styles/new-common'

export default {
  name: 'LoadingBar',
  common: commonLight,
  self (vars) {
    const { successColor, errorColor } = vars
    return {
      colorError: errorColor,
      colorLoading: successColor,
      height: '2px'
    }
  }
}

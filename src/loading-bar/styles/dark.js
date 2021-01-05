import { commonDark } from '../../_styles/new-common'

export default {
  name: 'LoadingBar',
  common: commonDark,
  self (vars) {
    const { successColor } = vars
    return {
      colorError: 'red',
      colorLoading: successColor,
      height: '2px'
    }
  }
}

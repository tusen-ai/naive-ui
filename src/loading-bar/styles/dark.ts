import { commonDark } from '../../_styles/new-common'
import type { LoadingBarTheme } from './light'

const loadingBarDark: LoadingBarTheme = {
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

export default loadingBarDark

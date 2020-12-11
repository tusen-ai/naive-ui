import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'LoadingBar',
  theme: 'light',
  peer: [
    baseLight
  ],
  getLocalVars (vars) {
    const {
      successColor,
      errorColor
    } = vars
    return {
      colorError: errorColor,
      colorLoading: successColor,
      height: '2px'
    }
  }
})

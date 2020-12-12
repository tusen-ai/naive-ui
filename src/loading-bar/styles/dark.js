import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'LoadingBar',
  theme: 'dark',
  peer: [baseDark],
  getLocalVars (vars) {
    const { successColor } = vars
    return {
      colorError: 'red',
      colorLoading: successColor,
      height: '2px'
    }
  }
})

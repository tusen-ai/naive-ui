import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseDark } from '../../_styles/base'
import { baseLoadingDark } from '../../_base/loading'

export default create({
  name: 'Spin',
  theme: 'dark',
  peer: [
    baseDark,
    baseLoadingDark
  ],
  getLocalVars (vars) {
    const {
      opacityDisabled
    } = vars
    return {
      ...sizeVariables,
      opacitySpinning: opacityDisabled
    }
  }
})

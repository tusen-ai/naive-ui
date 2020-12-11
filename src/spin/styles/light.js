import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseLight } from '../../_styles/base'
import { baseLoadingLight } from '../../_base/loading'

export default create({
  name: 'Spin',
  theme: 'light',
  peer: [
    baseLight,
    baseLoadingLight
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

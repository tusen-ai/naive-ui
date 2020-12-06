import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import {
  baseLoadingLight
} from '../../_base/loading/styles'

export default create({
  name: 'Spin',
  theme: 'light',
  peer: [
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

import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import {
  baseLoadingLight
} from '../../styles'

export default create({
  name: 'Spin',
  theme: 'light',
  peer: [
    baseLoadingLight
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      opacityDisabled
    } = derived
    return {
      ...sizeVariables,
      opacitySpinning: opacityDisabled
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import {
  baseLoadingDark
} from '../../styles'

export default create({
  name: 'Spin',
  theme: 'dark',
  peer: [
    baseLoadingDark
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

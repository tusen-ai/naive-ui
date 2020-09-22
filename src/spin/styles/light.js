import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'
import baseLoadingStyle from '../../_base/loading/styles/light'

export default create({
  name: 'Spin',
  theme: 'light',
  peer: [
    baseLoadingStyle
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

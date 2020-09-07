import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'
import baseLoadingStyle from '../../_base/loading/styles/dark'

export default create({
  name: 'Spin',
  theme: 'dark',
  peer: [
    baseLoadingStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      disabledOpacity
    } = derived
    return {
      ...sizeVariables,
      opacitySpinning: disabledOpacity
    }
  }
})

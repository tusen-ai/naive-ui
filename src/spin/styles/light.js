import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Spin',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      disabledOpacity
    } = base
    return {
      ...sizeVariables,
      spinSpinningOpacity: disabledOpacity
    }
  }
})

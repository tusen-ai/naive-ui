import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Transfer',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables
    }
  }
})

import create from '../../styles/_utils/create-component-base'
import selectMenuStyle from '../../_base/select-menu/styles/dark'

export default create({
  name: 'Popselect',
  theme: 'dark',
  peer: [
    selectMenuStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {

    }
  }
})

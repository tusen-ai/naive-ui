import create from '../../styles/_utils/create-component-base'
import selectMenuStyle from '../../_base/select-menu/styles/light'

export default create({
  name: 'Popselect',
  theme: 'light',
  peer: [
    selectMenuStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {

    }
  }
})

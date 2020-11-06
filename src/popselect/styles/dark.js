import create from '../../_styles/utils/create-component-base'
import {
  baseSelectMenuDark
} from '../../styles'

export default create({
  name: 'Popselect',
  theme: 'dark',
  peer: [
    baseSelectMenuDark
  ],
  getDerivedVariables ({ base, derived }) {
    return {

    }
  }
})

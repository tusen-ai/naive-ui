import create from '../../_styles/utils/create-component-base'
import {
  baseSelectMenuLight
} from '../../styles'

export default create({
  name: 'Popselect',
  theme: 'light',
  peer: [
    baseSelectMenuLight
  ],
  getDerivedVars (vars) {
    return {

    }
  }
})

import create from '../../_styles/utils/create-component-base'
import {
  popoverDark
} from '../../styles'

export default create({
  theme: 'dark',
  name: 'Tooltip',
  peer: [
    popoverDark
  ],
  getLocalVars (vars) {
    return {}
  }
})

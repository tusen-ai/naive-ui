import create from '../../_styles/utils/create-component-base'
import {
  popoverLight
} from '../../popover/styles'

export default create({
  theme: 'light',
  name: 'Tooltip',
  peer: [
    popoverLight
  ],
  getLocalVars (vars) {
    return {}
  }
})

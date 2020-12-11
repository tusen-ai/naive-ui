import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { popoverLight } from '../../popover'

export default create({
  theme: 'light',
  name: 'Tooltip',
  peer: [
    baseLight,
    popoverLight
  ],
  getLocalVars (vars) {
    return {}
  }
})

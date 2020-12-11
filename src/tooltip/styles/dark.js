import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { popoverDark } from '../../popover'

export default create({
  theme: 'dark',
  name: 'Tooltip',
  peer: [
    baseDark,
    popoverDark
  ],
  getLocalVars (vars) {
    return {}
  }
})

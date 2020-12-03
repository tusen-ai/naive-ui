import create from '../../_styles/utils/create-component-base'
import popoverStyle from '../../popover/styles/light'

export default create({
  theme: 'light',
  name: 'Tooltip',
  peer: [
    popoverStyle
  ],
  getLocalVars (vars) {
    return {}
  }
})

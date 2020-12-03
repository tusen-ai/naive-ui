import create from '../../_styles/utils/create-component-base'
import popoverStyle from '../../popover/styles/dark'

export default create({
  theme: 'dark',
  name: 'Tooltip',
  peer: [
    popoverStyle
  ],
  getLocalVars (vars) {
    return {}
  }
})

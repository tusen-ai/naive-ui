import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Drawer',
  peer: [baseLight],
  getLocalVars (vars) {
    return {
      color: vars.modalColor,
      textColor: vars.textColor2Overlay,
      boxShadow: vars.boxShadow3
    }
  }
})

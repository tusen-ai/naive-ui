import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'List',
  theme: 'light',
  peer: [baseLight],
  getLocalVars (vars) {
    const {
      textColor2,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius
    } = vars
    return {
      textColor: textColor2,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

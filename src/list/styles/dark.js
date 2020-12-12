import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'List',
  theme: 'dark',
  peer: [baseDark],
  getLocalVars (vars) {
    const {
      textColor2Overlay,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius
    } = vars
    return {
      textColor: textColor2Overlay,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius
    }
  }
})

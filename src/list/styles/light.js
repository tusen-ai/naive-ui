import { commonLight } from '../../_styles/new-common'

export default {
  name: 'List',
  common: commonLight,
  self (vars) {
    const {
      textColor2,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius,
      fontSize
    } = vars
    return {
      textColor: textColor2,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius,
      fontSize
    }
  }
}

import { commonLight } from '../../_styles/new-common'
import { scrollbarLight } from '../../scrollbar/styles'

export default {
  name: 'Drawer',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self (vars) {
    const { modalColor, textColor2Overlay, boxShadow3 } = vars
    return {
      color: modalColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow3
    }
  }
}

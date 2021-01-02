import { commonDark } from '../../_styles/new-common'
import { scrollbarDark } from '../../scrollbar/styles'

export default {
  name: 'Drawer',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
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

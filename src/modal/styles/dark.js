import { scrollbarDark } from '../../scrollbar/styles'
import { dialogDark } from '../../dialog/styles'
import { cardDark } from '../../card/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Modal',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Dialog: dialogDark,
    Card: cardDark
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

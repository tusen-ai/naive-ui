import { scrollbarLight } from '../../scrollbar/styles'
import { dialogLight } from '../../dialog/styles'
import { cardLight } from '../../card/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Modal',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Dialog: dialogLight,
    Card: cardLight
  },
  self (vars) {
    const { modalColor, textColor2, boxShadow3 } = vars
    return {
      color: modalColor,
      textColor: textColor2,
      boxShadow: boxShadow3
    }
  }
}

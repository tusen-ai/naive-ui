import { scrollbarDark } from '../../scrollbar/styles'
import { dialogDark } from '../../dialog/styles'
import { cardDark } from '../../card/styles'
import { commonDark } from '../../_styles/common'
import { ModalTheme } from './light'

const modalDark: ModalTheme = {
  name: 'Modal',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Dialog: dialogDark,
    Card: cardDark
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

export default modalDark

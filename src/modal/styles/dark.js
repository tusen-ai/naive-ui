import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { scrollbarDark } from '../../scrollbar'
import { dialogDark } from '../../dialog'
import { cardDark } from '../../card'

export default create({
  name: 'Modal',
  theme: 'dark',
  peer: [
    baseDark,
    scrollbarDark,
    dialogDark,
    cardDark
  ],
  getLocalVars (vars) {
    const {
      modalColor,
      textColor2Overlay,
      boxShadow3
    } = vars
    return {
      color: modalColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow3
    }
  }
})

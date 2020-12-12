import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { scrollbarLight } from '../../scrollbar/styles'
import { dialogLight } from '../../dialog/styles'
import { cardLight } from '../../card/styles'

export default create({
  name: 'Modal',
  theme: 'light',
  peer: [baseLight, scrollbarLight, dialogLight, cardLight],
  getLocalVars (vars) {
    const { modalColor, textColor2, boxShadow3 } = vars
    return {
      color: modalColor,
      textColor: textColor2,
      boxShadow: boxShadow3
    }
  }
})

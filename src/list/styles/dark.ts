import { commonDark } from '../../_styles/common'
import type { ListTheme } from './light'

const listDark: ListTheme = {
  name: 'List',
  common: commonDark,
  self (vars) {
    const {
      textColor2Overlay,
      cardColor,
      modalColor,
      dividerColorOverlay,
      borderRadius,
      fontSize
    } = vars
    return {
      textColor: textColor2Overlay,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius,
      fontSize
    }
  }
}

export default listDark

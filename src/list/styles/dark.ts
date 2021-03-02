import { commonDark } from '../../_styles/common'
import type { ListTheme } from './light'

const listDark: ListTheme = {
  name: 'List',
  common: commonDark,
  self (vars) {
    const {
      textColor2,
      cardColor,
      modalColor,
      dividerColor,
      borderRadius,
      fontSize
    } = vars
    return {
      textColor: textColor2,
      color: cardColor,
      colorModal: modalColor,
      borderColor: dividerColor,
      borderRadius,
      fontSize
    }
  }
}

export default listDark

import { composite } from 'seemly'
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
      popoverColor,
      dividerColor,
      borderRadius,
      fontSize
    } = vars
    return {
      textColor: textColor2,
      color: cardColor,
      colorModal: modalColor,
      colorPopover: popoverColor,
      borderColor: dividerColor,
      borderColorModal: composite(modalColor, dividerColor),
      borderColorPopover: composite(popoverColor, dividerColor),
      borderRadius,
      fontSize
    }
  }
}

export default listDark

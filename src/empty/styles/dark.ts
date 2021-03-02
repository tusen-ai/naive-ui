import { commonDark } from '../../_styles/common'
import sizeVarables from './_common'
import type { EmptyTheme } from './light'

const emptyDark: EmptyTheme = {
  name: 'Empty',
  common: commonDark,
  self (vars) {
    const {
      textColorDisabled,
      iconColor,
      textColor2,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    } = vars
    return {
      ...sizeVarables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge,
      textColor: textColorDisabled,
      iconColor: iconColor,
      extraTextColor: textColor2
    }
  }
}

export default emptyDark

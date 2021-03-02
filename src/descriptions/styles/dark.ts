import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { DescriptionsTheme } from './light'

const descriptionsDark: DescriptionsTheme = {
  name: 'Descriptions',
  common: commonDark,
  self (vars) {
    const {
      tableHeaderColor,
      textColor1,
      textColor2,
      cardColor,
      modalColor,
      dividerColor,
      borderRadius,
      fontWeightStrong,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      thColor: tableHeaderColor,
      thTextColor: textColor1,
      thFontWeight: fontWeightStrong,
      tdTextColor: textColor2,
      tdColor: cardColor,
      tdColorModal: modalColor,
      borderColor: dividerColor,
      borderRadius: borderRadius
    }
  }
}

export default descriptionsDark

import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { DescriptionsTheme } from './light'

const descriptionsDark: DescriptionsTheme = {
  name: 'Descriptions',
  common: commonDark,
  self (vars) {
    const {
      tableHeaderColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
      cardColor,
      modalColor,
      dividerColorOverlay,
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
      thColor: tableHeaderColorOverlay,
      thTextColor: textColor1Overlay,
      thFontWeight: fontWeightStrong,
      tdTextColor: textColor2Overlay,
      tdColor: cardColor,
      tdColorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius: borderRadius
    }
  }
}

export default descriptionsDark

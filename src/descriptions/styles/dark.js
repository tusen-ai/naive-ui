import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Descriptions',
  peer: [baseDark],
  getLocalVars (vars) {
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
      headerColor: tableHeaderColorOverlay,
      headerTextColor: textColor1Overlay,
      headerFontWeight: fontWeightStrong,
      contentTextColor: textColor2Overlay,
      contentColor: cardColor,
      contentColorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius: borderRadius
    }
  }
})

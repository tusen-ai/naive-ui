import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Table',
  getDerivedVariables ({ base, derived }) {
    const {
      dividerColorOverlay,
      cardColor,
      modalColor,
      actionColorOverlay,
      textColorPrimaryOverlay,
      textColorSecondaryOverlay
    } = derived
    const {
      fontWeightStrong,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      borderColor: dividerColorOverlay,
      bodyColor: cardColor,
      bodyColorModal: modalColor,
      headerColor: actionColorOverlay,
      headerTextColor: textColorPrimaryOverlay,
      bodyTextColor: textColorSecondaryOverlay,
      borderRadius,
      headFontWeight: fontWeightStrong
    }
  }
})

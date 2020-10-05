import create from '../../_styles/utils/create-component-base'
import { composite } from '../../_utils/color'
import sizeVariables from './_common'

export default create({
  theme: 'light',
  name: 'Table',
  getDerivedVariables ({ base, derived }) {
    const {
      dividerColorOverlay,
      cardColor,
      modalColor,
      actionColorOverlay,
      textColorPrimary,
      textColorSecondary
    } = derived
    const {
      borderRadius,
      fontWeightStrong
    } = base
    return {
      ...sizeVariables,
      borderColor: dividerColorOverlay,
      bodyColor: cardColor,
      bodyColorModal: modalColor,
      headerColor: composite(cardColor, actionColorOverlay),
      headerTextColor: textColorPrimary,
      bodyTextColor: textColorSecondary,
      borderRadius,
      headFontWeight: fontWeightStrong
    }
  }
})

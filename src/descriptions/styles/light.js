import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { composite } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Descriptions',
  getDerivedVariables ({ base, derived }) {
    const {
      tableHeaderColorOverlay,
      textColorPrimaryOverlay,
      textColorSecondaryOverlay,
      cardColor,
      modalColor,
      dividerColorOverlay
    } = derived
    const {
      borderRadius,
      fontWeightStrong
    } = base
    return {
      ...commonVariables,
      headerColor: composite(cardColor, tableHeaderColorOverlay),
      headerTextColor: textColorPrimaryOverlay,
      headerFontWeight: fontWeightStrong,
      contentTextColor: textColorSecondaryOverlay,
      contentColor: cardColor,
      contentColorModal: modalColor,
      borderColor: dividerColorOverlay,
      borderRadius: borderRadius
    }
  }
})

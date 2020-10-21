import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Descriptions',
  getDerivedVariables ({ base, derived }) {
    const {
      tableHeaderColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
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

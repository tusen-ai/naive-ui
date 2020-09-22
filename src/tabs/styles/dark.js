import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Tabs',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      primaryColor,
      textColorDisabledOverlay,
      iconColorOverlay,
      iconColorDisabledOverlay,
      closeOverlayColor,
      tabColorOverlay,
      textColorPrimaryOverlay,
      dividerColorOverlay
    } = derived
    const {
      strongFontWeight,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      labelTextColor: textColorSecondaryOverlay,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: textColorDisabledOverlay,
      labelBarColor: primaryColor,
      scrollButtonColor: iconColorOverlay,
      scrollButtonColorDisabled: iconColorDisabledOverlay,
      tabCloseColor: closeOverlayColor,
      tabColor: tabColorOverlay,
      tabBorderColorActive: 'transparent',
      tabTextColor: textColorSecondaryOverlay,
      tabTextColorActive: textColorPrimaryOverlay,
      tabBorderColor: dividerColorOverlay,
      tabFontWeight: strongFontWeight,
      tabBorderRadius: borderRadius,
      paneTextColor: textColorSecondaryOverlay
    }
  }
})

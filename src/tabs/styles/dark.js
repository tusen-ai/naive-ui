import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Tabs',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2Overlay,
      primaryColor,
      textColorDisabledOverlay,
      iconColorOverlay,
      iconColorDisabledOverlay,
      closeColorOverlay,
      tabColorOverlay,
      textColor1Overlay,
      dividerColorOverlay
    } = derived
    const {
      fontWeightStrong,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      labelTextColor: textColor2Overlay,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: textColorDisabledOverlay,
      labelBarColor: primaryColor,
      scrollButtonColor: iconColorOverlay,
      scrollButtonColorDisabled: iconColorDisabledOverlay,
      tabCloseColor: closeColorOverlay,
      tabColor: tabColorOverlay,
      tabBorderColorActive: 'transparent',
      tabTextColor: textColor2Overlay,
      tabTextColorActive: textColor1Overlay,
      tabBorderColor: dividerColorOverlay,
      tabFontWeight: fontWeightStrong,
      tabBorderRadius: borderRadius,
      paneTextColor: textColor2Overlay
    }
  }
})

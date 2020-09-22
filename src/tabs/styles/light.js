import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Tabs',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
      primaryColor,
      textColorDisabled,
      iconColorOverlay,
      iconColorDisabledOverlay,
      closeColor,
      tabColorOverlay,
      borderColor,
      textColorPrimary,
      dividerColorOverlay
    } = derived
    const {
      strongFontWeight,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      labelTextColor: textColorSecondary,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: textColorDisabled,
      labelBarColor: primaryColor,
      scrollButtonColor: iconColorOverlay,
      scrollButtonColorDisabled: iconColorDisabledOverlay,
      tabCloseColor: closeColor,
      tabColor: tabColorOverlay,
      tabBorderColorActive: borderColor,
      tabTextColor: textColorSecondary,
      tabTextColorActive: textColorPrimary,
      tabBorderColor: dividerColorOverlay,
      tabFontWeight: strongFontWeight,
      tabBorderRadius: borderRadius,
      paneTextColor: textColorSecondary
    }
  }
})

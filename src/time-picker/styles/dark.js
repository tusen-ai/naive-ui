import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'TimePicker',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverBackgroundColor,
      secondaryTextOverlayColor,
      primaryColor,
      pendingBackgroundOverlayColor,
      dividerOverlayColor,
      disabledOpacity
    } = derived
    const {
      popmenuBoxShadow,
      borderRadius,
      transformDebounceScale
    } = base
    return {
      color: popoverBackgroundColor,
      textColor: secondaryTextOverlayColor,
      textColorActive: primaryColor,
      textDecorationColor: secondaryTextOverlayColor,
      textDecorationColorActive: primaryColor,
      itemColorHover: pendingBackgroundOverlayColor,
      dividerColor: dividerOverlayColor,
      boxShadow: popmenuBoxShadow,
      itemDisabledOpacity: disabledOpacity,
      borderRadius,
      transformDebounceScale
    }
  }
})

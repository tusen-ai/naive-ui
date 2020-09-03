import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'TimePicker',
  getDerivedVariables ({ base, derived }) {
    const {
      modalBackgroundColor,
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
      color: modalBackgroundColor,
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

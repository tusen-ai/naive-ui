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
      borderRadius
    } = base
    return {
      panelColor: modalBackgroundColor,
      panelBoxShadow: popmenuBoxShadow,
      panelDividerColor: dividerOverlayColor,
      itemTextColor: secondaryTextOverlayColor,
      itemTextColorActive: primaryColor,
      itemColorHover: pendingBackgroundOverlayColor,
      itemOpacityDisabled: disabledOpacity,
      triggerTextDecorationColor: secondaryTextOverlayColor,
      triggerTextDecorationColorActive: primaryColor,
      borderRadius
    }
  }
})

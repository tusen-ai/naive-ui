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
      borderRadius
    } = base
    return {
      panelColor: popoverBackgroundColor,
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

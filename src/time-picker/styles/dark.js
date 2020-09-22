import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'TimePicker',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverColor,
      textColorSecondaryOverlay,
      primaryColor,
      hoverColorOverlay,
      dividerColorOverlay,
      opacityDisabled
    } = derived
    const {
      popmenuBoxShadow,
      borderRadius
    } = base
    return {
      panelColor: popoverColor,
      panelBoxShadow: popmenuBoxShadow,
      panelDividerColor: dividerColorOverlay,
      itemTextColor: textColorSecondaryOverlay,
      itemTextColorActive: primaryColor,
      itemColorHover: hoverColorOverlay,
      itemOpacityDisabled: opacityDisabled,
      triggerTextDecorationColor: textColorSecondaryOverlay,
      triggerTextDecorationColorActive: primaryColor,
      borderRadius
    }
  }
})

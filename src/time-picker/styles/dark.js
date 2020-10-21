import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'TimePicker',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverColor,
      textColor2Overlay,
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
      itemTextColor: textColor2Overlay,
      itemTextColorActive: primaryColor,
      itemColorHover: hoverColorOverlay,
      itemOpacityDisabled: opacityDisabled,
      triggerTextDecorationColor: textColor2Overlay,
      triggerTextDecorationColorActive: primaryColor,
      borderRadius
    }
  }
})

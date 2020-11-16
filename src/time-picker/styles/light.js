import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'TimePicker',
  getDerivedVariables ({ base, derived }) {
    const {
      modalColor,
      textColor2Overlay,
      primaryColor,
      hoverColorOverlay,
      dividerColorOverlay,
      opacityDisabled
    } = derived
    const {
      boxShadow2,
      borderRadius
    } = base
    return {
      panelColor: modalColor,
      panelBoxShadow: boxShadow2,
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

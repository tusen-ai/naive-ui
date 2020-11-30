import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'

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
      boxShadow2,
      borderRadius
    } = base
    return {
      ...commonVars,
      panelColor: popoverColor,
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

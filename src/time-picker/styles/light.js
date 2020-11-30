import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'TimePicker',
  getDerivedVars (vars) {
    const {
      modalColor,
      textColor2Overlay,
      primaryColor,
      hoverColorOverlay,
      dividerColorOverlay,
      opacityDisabled,
      boxShadow2,
      borderRadius
    } = vars

    return {
      ...commonVars,
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

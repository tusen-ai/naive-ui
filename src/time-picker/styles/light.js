import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'
import { scrollbarLight } from '../../scrollbar/styles'

export default create({
  name: 'TimePicker',
  theme: 'light',
  peer: [
    baseLight,
    iconLight,
    scrollbarLight
  ],
  getLocalVars (vars) {
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

import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'
import { scrollbarDark } from '../../scrollbar/styles'

export default create({
  name: 'TimePicker',
  theme: 'dark',
  peer: [baseDark, iconDark, scrollbarDark],
  getLocalVars (vars) {
    const {
      popoverColor,
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

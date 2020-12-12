import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Dropdown',
  peer: [baseDark],
  getLocalVars (vars) {
    const {
      textColor2,
      boxShadow2,
      dividerColorOverlay,
      hoverColorOverlay,
      popoverColor,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      color: popoverColor,
      dividerColor: dividerColorOverlay,
      borderRadius,
      boxShadow: boxShadow2,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColorOverlay
    }
  }
})

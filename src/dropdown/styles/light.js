import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Dropdown',
  getDerivedVars (vars) {
    const {
      textColor2,
      boxShadow2,
      dividerColor,
      hoverColorOverlay,
      popoverColor,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      color: popoverColor,
      dividerColor,
      borderRadius,
      boxShadow: boxShadow2,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColorOverlay
    }
  }
})

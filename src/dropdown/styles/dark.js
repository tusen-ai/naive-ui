import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Dropdown',
  getDerivedVariables ({ derived, base }) {
    const {
      textColor2,
      boxShadow2,
      dividerColorOverlay,
      hoverColorOverlay,
      popoverColor
    } = derived
    const {
      borderRadius
    } = base
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

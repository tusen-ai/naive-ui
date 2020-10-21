import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Dropdown',
  getDerivedVariables ({ derived, base }) {
    const {
      textColor2,
      popoverBoxShadow,
      dividerColor,
      hoverColorOverlay
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      dividerColor,
      borderRadius,
      boxShadow: popoverBoxShadow,
      suffixColor: textColor2,
      prefixColor: textColor2,
      optionColorHover: hoverColorOverlay
    }
  }
})

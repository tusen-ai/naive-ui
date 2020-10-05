import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Dropdown',
  getDerivedVariables ({ derived, base }) {
    const {
      textColorSecondary,
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
      suffixColor: textColorSecondary,
      prefixColor: textColorSecondary,
      optionColorHover: hoverColorOverlay
    }
  }
})

import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Checkbox',
  getDerivedVariables ({ base, derived }) {
    const {
      disabledInputBackgroundOverlayColor,
      cardBackgroundColor,
      modalBackgroundColor,
      borderOverlayColor,
      primaryColor,
      secondaryTextOverlayColor,
      disabledTextOverlayColor
    } = derived
    return {
      ...commonVariables,
      borderRadius: base.smallBorderRadius,
      color: 'transparent',
      colorDisabled: disabledInputBackgroundOverlayColor,
      colorTableHeader: cardBackgroundColor,
      colorModalTableHeader: modalBackgroundColor,
      iconColor: cardBackgroundColor,
      iconColorDisabled: disabledTextOverlayColor,
      borderColor: borderOverlayColor,
      borderColorDisabled: borderOverlayColor,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: secondaryTextOverlayColor,
      labelTextColorDisabled: disabledTextOverlayColor
    }
  }
})

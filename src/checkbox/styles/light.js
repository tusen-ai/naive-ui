import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Checkbox',
  getDerivedVariables ({ base, derived }) {
    const {
      baseBackgroundColor,
      disabledInputBackgroundColor,
      cardBackgroundColor,
      modalBackgroundColor,
      disabledTextColor,
      borderColor,
      primaryColor,
      secondaryTextColor
    } = derived
    return {
      ...commonVariables,
      borderRadius: base.smallBorderRadius,
      color: baseBackgroundColor,
      colorDisabled: disabledInputBackgroundColor,
      colorTableHeader: cardBackgroundColor,
      colorModalTableHeader: modalBackgroundColor,
      iconColor: baseBackgroundColor,
      iconColorDisabled: disabledTextColor,
      borderColor: borderColor,
      borderColorDisabled: borderColor,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: secondaryTextColor,
      labelTextColorDisabled: disabledTextColor
    }
  }
})

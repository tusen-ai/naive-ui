import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Checkbox',
  getDerivedVariables ({ base, derived }) {
    const {
      baseColor,
      inputColorDisabled,
      cardColor,
      modalColor,
      textColorDisabled,
      borderColor,
      primaryColor,
      textColorSecondary
    } = derived
    return {
      ...commonVariables,
      borderRadius: base.smallBorderRadius,
      color: baseColor,
      colorDisabled: inputColorDisabled,
      colorTableHeader: cardColor,
      colorModalTableHeader: modalColor,
      iconColor: baseColor,
      iconColorDisabled: textColorDisabled,
      borderColor: borderColor,
      borderColorDisabled: borderColor,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: textColorSecondary,
      labelTextColorDisabled: textColorDisabled
    }
  }
})

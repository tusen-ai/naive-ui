import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'Checkbox',
  getDerivedVars (vars) {
    const {
      baseColor,
      inputColorDisabled,
      cardColor,
      modalColor,
      textColorDisabled,
      borderColor,
      primaryColor,
      textColor2
    } = vars
    return {
      ...commonVariables,
      borderRadius: vars.borderRadiusSmall,
      color: baseColor,
      colorDisabled: inputColorDisabled,
      colorTableHeader: cardColor,
      colorTableHeaderModal: modalColor,
      iconColor: baseColor,
      iconColorDisabled: textColorDisabled,
      borderColor: borderColor,
      borderColorDisabled: borderColor,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: textColor2,
      labelTextColorDisabled: textColorDisabled
    }
  }
})

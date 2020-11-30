import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'Checkbox',
  getDerivedVars (vars) {
    const {
      inputColorDisabledOverlay,
      cardColor,
      modalColor,
      borderColorOverlay,
      primaryColor,
      textColor2Overlay,
      textColorDisabledOverlay
    } = vars
    return {
      ...commonVariables,
      borderRadius: vars.borderRadiusSmall,
      color: 'transparent',
      colorDisabled: inputColorDisabledOverlay,
      colorTableHeader: cardColor,
      colorTableHeaderModal: modalColor,
      iconColor: cardColor,
      iconColorDisabled: textColorDisabledOverlay,
      borderColor: borderColorOverlay,
      borderColorDisabled: borderColorOverlay,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: textColor2Overlay,
      labelTextColorDisabled: textColorDisabledOverlay
    }
  }
})

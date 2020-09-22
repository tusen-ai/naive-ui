import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Checkbox',
  getDerivedVariables ({ base, derived }) {
    const {
      inputColorDisabledOverlay,
      cardColor,
      modalColor,
      borderColorOverlay,
      primaryColor,
      textColorSecondaryOverlay,
      textColorDisabledOverlay
    } = derived
    return {
      ...commonVariables,
      borderRadius: base.borderRadiusSmall,
      color: 'transparent',
      colorDisabled: inputColorDisabledOverlay,
      colorTableHeader: cardColor,
      colorModalTableHeader: modalColor,
      iconColor: cardColor,
      iconColorDisabled: textColorDisabledOverlay,
      borderColor: borderColorOverlay,
      borderColorDisabled: borderColorOverlay,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: textColorSecondaryOverlay,
      labelTextColorDisabled: textColorDisabledOverlay
    }
  }
})

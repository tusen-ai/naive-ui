import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { CheckboxTheme } from './light'

const checkboxDark: CheckboxTheme = {
  name: 'Checkbox',
  common: commonDark,
  self (vars) {
    const {
      inputColorDisabled,
      cardColor,
      modalColor,
      borderColor,
      primaryColor,
      textColor2,
      textColorDisabled,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadiusSmall
    } = vars
    return {
      ...commonVariables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadius: borderRadiusSmall,
      color: 'transparent',
      colorChecked: primaryColor,
      colorDisabled: inputColorDisabled,
      colorDisabledChecked: inputColorDisabled,
      colorTableHeader: cardColor,
      colorTableHeaderModal: modalColor,
      checkMarkColor: cardColor,
      checkMarkColorDisabled: textColorDisabled,
      checkMarkColorDisabledChecked: textColorDisabled,
      border: `1px solid ${borderColor}`,
      borderDisabled: `1px solid ${borderColor}`,
      borderDisabledChecked: `1px solid ${borderColor}`,
      borderChecked: `1px solid ${primaryColor}`,
      borderFocus: `1px solid ${primaryColor}`,
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
      textColor: textColor2,
      textColorDisabled: textColorDisabled
    }
  }
}

export default checkboxDark

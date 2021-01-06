import { selectLight } from '../../select/styles'
import { inputLight } from '../../input/styles'
import { iconLight } from '../../icon/styles'
import commonVariables from './_common.js'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Pagination',
  common: commonLight,
  peers: {
    Select: selectLight,
    Input: inputLight,
    Icon: iconLight
  },
  self (vars) {
    const {
      textColor2,
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      inputColorDisabled,
      textColorDisabled,
      borderColor,
      borderRadius,
      fontSize
    } = vars

    return {
      ...commonVariables,
      buttonColor: 'transparent',
      buttonColorHover: 'transparent',
      buttonColorPressed: 'transparent',
      buttonBorder: `1px solid ${borderColor}`,
      buttonBorderHover: `1px solid ${borderColor}`,
      buttonBorderPressed: `1px solid ${borderColor}`,
      buttonIconColor: textColor2,
      buttonIconColorHover: textColor2,
      buttonIconColorPressed: textColor2,
      itemTextColor: textColor2,
      itemTextColorHover: primaryColorHover,
      itemTextColorPressed: primaryColorPressed,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabled,
      itemColor: 'transparent',
      itemColorHover: 'transparent',
      itemColorPressed: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: inputColorDisabled,
      itemBorder: '1px solid transparent',
      itemBorderHover: '1px solid transparent',
      itemBorderPressed: '1px solid transparent',
      itemBorderActive: `1px solid ${primaryColor}`,
      itemBorderDisabled: `1px solid ${borderColor}`,
      itemBorderRadius: borderRadius,
      itemFontSize: fontSize,
      jumperTextColor: textColor2,
      jumperTextColorDisabled: textColorDisabled
    }
  }
}

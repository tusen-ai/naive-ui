import create from '../../_styles/utils/create-component-base'
import { selectLight } from '../../select'
import { inputLight } from '../../input'
import { iconLight } from '../../icon'
import { baseLight } from '../../_styles/base'
import commonVariables from './_common.js'

export default create({
  name: 'Pagination',
  theme: 'light',
  peer: [
    baseLight,
    selectLight,
    inputLight,
    iconLight
  ],
  getLocalVars (vars) {
    const {
      textColor2,
      primaryColor,
      inputColorDisabled,
      textColorDisabled,
      borderColor,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      buttonIconColor: textColor2,
      buttonIconColorHover: textColor2,
      buttonBorder: `1px solid ${borderColor}`,
      itemTextColor: textColor2,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabled,
      itemColor: 'transparent',
      itemColorHover: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: inputColorDisabled,
      itemBorder: '1px solid transparent',
      itemBorderActive: `1px solid ${primaryColor}`,
      itemBorderDisabled: `1px solid ${borderColor}`,
      itemBorderRadius: borderRadius,
      jumperTextColor: textColor2,
      jumperTextColorDisabled: textColorDisabled
    }
  }
})

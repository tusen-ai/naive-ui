import create from '../../_styles/utils/create-component-base'
import { baseLight, selectLight, inputLight, iconLight } from '../../styles'
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
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2,
      primaryColor,
      inputColorDisabled,
      textColorDisabled,
      borderColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      buttonTextColor: textColor2,
      buttonTextColorHover: textColor2,
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

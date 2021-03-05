import { changeColor } from 'seemly'
import { selectDark } from '../../select/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { PaginationTheme } from './light'

const paginationDark: PaginationTheme = {
  name: 'Pagination',
  common: commonDark,
  peers: {
    Select: selectDark,
    Input: inputDark
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
      opacity3,
      borderRadius,
      fontSize
    } = vars
    const borderColorActive = changeColor(primaryColor, {
      alpha: Number(opacity3)
    })
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
      itemColorActiveHover: 'transparent',
      itemColorDisabled: inputColorDisabled,
      itemBorder: '1px solid transparent',
      itemBorderHover: '1px solid transparent',
      itemBorderPressed: '1px solid transparent',
      itemBorderActive: `1px solid ${borderColorActive}`,
      itemBorderDisabled: '1px solid transparent',
      itemBorderRadius: borderRadius,
      itemFontSize: fontSize,
      jumperTextColor: textColor2,
      jumperTextColorDisabled: textColorDisabled
    }
  }
}

export default paginationDark

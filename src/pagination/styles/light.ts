import { selectLight } from '../../select/styles'
import { inputLight } from '../../input/styles'
import { commonLight, ThemeCommonVars } from '../../_styles/new-common'
import commonVariables from './_common'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
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

export type PaginationThemeVars = ReturnType<typeof self>

const paginationLight = createTheme({
  name: 'Pagination',
  common: commonLight,
  peers: {
    Select: selectLight,
    Input: inputLight
  },
  self
})

export default paginationLight
export type PaginationTheme = typeof paginationLight

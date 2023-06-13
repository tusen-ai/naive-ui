import { popselectLight } from '../../popselect/styles'
import { selectLight } from '../../select/styles'
import { inputLight } from '../../input/styles'
import { commonLight, type ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    inputColorDisabled,
    textColorDisabled,
    borderColor,
    borderRadius,
    // item font size
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    // item size
    heightTiny,
    heightSmall,
    heightMedium
  } = vars

  return {
    ...commonVariables,
    buttonColor: '#0000',
    buttonColorHover: '#0000',
    buttonColorPressed: '#0000',
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
    itemColor: '#0000',
    itemColorHover: '#0000',
    itemColorPressed: '#0000',
    itemColorActive: '#0000',
    itemColorActiveHover: '#0000',
    itemColorDisabled: inputColorDisabled,
    itemBorder: '1px solid #0000',
    itemBorderHover: '1px solid #0000',
    itemBorderPressed: '1px solid #0000',
    itemBorderActive: `1px solid ${primaryColor}`,
    itemBorderDisabled: `1px solid ${borderColor}`,
    itemBorderRadius: borderRadius,
    itemSizeSmall: heightTiny,
    itemSizeMedium: heightSmall,
    itemSizeLarge: heightMedium,
    itemFontSizeSmall: fontSizeTiny,
    itemFontSizeMedium: fontSizeSmall,
    itemFontSizeLarge: fontSizeMedium,
    jumperFontSizeSmall: fontSizeTiny,
    jumperFontSizeMedium: fontSizeSmall,
    jumperFontSizeLarge: fontSizeMedium,
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
    Input: inputLight,
    Popselect: popselectLight
  },
  self
})

export default paginationLight
export type PaginationTheme = typeof paginationLight

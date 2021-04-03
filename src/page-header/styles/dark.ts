import type { PageHeaderTheme } from './light'
import { commonDark } from '../../_styles/common'
import common from './_common'

export const pageHeaderDark: PageHeaderTheme = {
  name: 'PageHeader',
  common: commonDark,
  self (vars) {
    const {
      textColor1,
      textColor2,
      textColor3,
      fontSize,
      fontWeightStrong,
      primaryColorHover,
      primaryColorPressed
    } = vars
    return {
      ...common,
      titleFontWeight: fontWeightStrong,
      fontSize,
      titleTextColor: textColor1,
      backColor: textColor2,
      backColorHover: primaryColorHover,
      backColorPressed: primaryColorPressed,
      subtitleTextColor: textColor3
    }
  }
}

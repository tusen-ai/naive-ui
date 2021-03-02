import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { BreadcrumbTheme } from './light'

const breadcrumbDark: BreadcrumbTheme = {
  name: 'Breadcrumb',
  common: commonDark,
  self (vars) {
    const {
      fontSize,
      textColor3,
      primaryColorHover,
      primaryColorPressed,
      textColor2
    } = vars
    return {
      ...commonVariables,
      fontSize: fontSize,
      itemTextColor: textColor3,
      itemTextColorHover: primaryColorHover,
      itemTextColorPressed: primaryColorPressed,
      itemTextColorActive: textColor2,
      separatorColor: textColor3
    }
  }
}

export default breadcrumbDark

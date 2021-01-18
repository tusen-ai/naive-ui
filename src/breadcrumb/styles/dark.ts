import commonVariables from './_common'
import { commonDark } from '../../_styles/new-common'
import type { BreadcrumbTheme } from './light'

const breadcrumbDark: BreadcrumbTheme = {
  name: 'Breadcrumb',
  common: commonDark,
  self (vars) {
    const {
      fontSize,
      textColor3Overlay,
      primaryColorHover,
      primaryColorPressed,
      textColor2Overlay
    } = vars
    return {
      ...commonVariables,
      fontSize: fontSize,
      itemTextColor: textColor3Overlay,
      itemTextColorHover: primaryColorHover,
      itemTextColorPressed: primaryColorPressed,
      itemTextColorActive: textColor2Overlay,
      separatorColor: textColor3Overlay
    }
  }
}

export default breadcrumbDark

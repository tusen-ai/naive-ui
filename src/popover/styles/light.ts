import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import commonVariables from './_common'

const popoverLight = {
  name: 'Popover',
  common: commonLight,
  self (vars: ThemeCommonVars) {
    const {
      boxShadow2,
      popoverColor,
      textColor2,
      borderRadius,
      fontSize
    } = vars
    return {
      ...commonVariables,
      fontSize,
      borderRadius,
      color: popoverColor,
      textColor: textColor2,
      boxShadow: boxShadow2
    }
  }
}

export default popoverLight

export type PopoverThemeVars = ReturnType<typeof popoverLight.self>

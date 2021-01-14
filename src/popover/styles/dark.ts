import { commonDark } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import commonVariables from './_common'
import { PopoverThemeVars } from './light'

export default {
  name: 'Popover',
  common: commonDark,
  self (vars: ThemeCommonVars): PopoverThemeVars {
    const {
      popoverColor,
      textColor2Overlay,
      boxShadow2,
      borderRadius,
      fontSize
    } = vars
    return {
      ...commonVariables,
      fontSize,
      borderRadius,
      color: popoverColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow2
    }
  }
}

import commonVariables from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Popover',
  common: commonDark,
  self (vars) {
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

import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Popover',
  common: commonLight,
  self (vars) {
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

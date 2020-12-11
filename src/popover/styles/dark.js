import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'Popover',
  theme: 'dark',
  peer: [
    baseDark
  ],
  getLocalVars (vars) {
    const {
      popoverColor,
      textColor2Overlay,
      boxShadow2,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      borderRadius,
      color: popoverColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow2
    }
  }
})

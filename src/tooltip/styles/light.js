import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { popoverLight } from '../../popover/styles'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'Tooltip',
  peer: [
    baseLight,
    popoverLight
  ],
  getLocalVars (vars) {
    return {
      ...commonVars,
      borderRadius: vars.borderRadius,
      boxShadow: vars.boxShadow2,
      color: 'rgba(0, 0, 0, .85)',
      textColor: vars.baseColor
    }
  }
})

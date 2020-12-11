import create from '../../_styles/utils/create-component-base'
import commonVariables from '../../input/styles/_common'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'InputGroupLabel',
  theme: 'light',
  peer: [
    baseLight
  ],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      color: vars.actionColor,
      textColor: vars.textColor2,
      boxShadow: `inset 0 0 0 1px ${vars.borderColor}`
    }
  }
})

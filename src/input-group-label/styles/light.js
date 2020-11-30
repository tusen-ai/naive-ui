import create from '../../_styles/utils/create-component-base'
import commonVariables from '../../input/styles/_common'

export default create({
  name: 'InputGroupLabel',
  theme: 'light',
  getDerivedVars (vars) {
    return {
      ...commonVariables,
      borderRadius: vars.borderRadius,
      color: vars.actionColor,
      textColor: vars.textColor2,
      boxShadow: `inset 0 0 0 1px ${vars.borderColor}`
    }
  }
})

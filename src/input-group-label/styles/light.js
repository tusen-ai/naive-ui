import create from '../../_styles/utils/create-component-base'
import commonVariables from '../../input/styles/_common'

export default create({
  name: 'InputGroupLabel',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.actionColor,
      textColor: derived.textColorSecondary,
      boxShadow: `inset 0 0 0 1px ${derived.borderColor}`
    }
  }
})

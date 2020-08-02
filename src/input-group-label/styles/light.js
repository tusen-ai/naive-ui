import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/input'

export default create({
  name: 'InputGroupLabel',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.actionBackgroundColor,
      textColor: derived.secondaryTextColor,
      boxShadow: `inset 0 0 0 1px ${derived.borderColor}`
    }
  }
})

import create from '../_utils/create-component-base'
import commonVariables from '../_common-style/input'

export default create({
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      backgroundColor: derived.actionBackgroundColor,
      textColor: derived.secondaryTextColor,
      boxShadow: `inset 0 0 0 1px ${derived.borderColor}`
    }
  }
})

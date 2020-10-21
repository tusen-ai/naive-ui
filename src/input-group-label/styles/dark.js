import create from '../../_styles/utils/create-component-base'
import commonVariables from '../../input/styles/_common'

export default create({
  name: 'InputGroupLabel',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      color: derived.inputColorOverlay,
      textColor: derived.textColor2,
      boxShadow: `inset 0 0 0 1px transparent`
    }
  }
})

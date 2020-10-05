import create from '../../_styles/utils/create-component-base'
import sizeVarables from './_common'

export default create({
  theme: 'light',
  name: 'Empty',
  getDerivedVariables ({ derived }) {
    const {
      textColorDisabled,
      iconColorOverlay,
      textColorSecondary
    } = derived
    return {
      ...sizeVarables,
      textColor: textColorDisabled,
      iconColor: iconColorOverlay,
      extraTextColor: textColorSecondary
    }
  }
})

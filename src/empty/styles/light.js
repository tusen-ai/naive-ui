import create from '../../styles/_utils/create-component-base'
import sizeVarables from './_common'

export default create({
  theme: 'light',
  name: 'Empty',
  getDerivedVariables ({ derived }) {
    const {
      disabledTextColor,
      iconOverlayColor,
      secondaryTextColor
    } = derived
    return {
      ...sizeVarables,
      textColor: disabledTextColor,
      iconColor: iconOverlayColor,
      extraTextColor: secondaryTextColor
    }
  }
})

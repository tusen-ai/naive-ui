import create from '../../styles/_utils/create-component-base'
import sizeVarables from './_common'

export default create({
  theme: 'dark',
  name: 'Empty',
  getDerivedVariables ({ derived }) {
    const {
      disabledTextOverlayColor,
      iconOverlayColor,
      secondaryTextOverlayColor
    } = derived
    return {
      ...sizeVarables,
      textColor: disabledTextOverlayColor,
      iconColor: iconOverlayColor,
      extraTextColor: secondaryTextOverlayColor
    }
  }
})

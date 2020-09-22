import create from '../../styles/_utils/create-component-base'
import sizeVarables from './_common'

export default create({
  theme: 'dark',
  name: 'Empty',
  getDerivedVariables ({ derived }) {
    const {
      textColorDisabledOverlay,
      iconColorOverlay,
      textColorSecondaryOverlay
    } = derived
    return {
      ...sizeVarables,
      textColor: textColorDisabledOverlay,
      iconColor: iconColorOverlay,
      extraTextColor: textColorSecondaryOverlay
    }
  }
})

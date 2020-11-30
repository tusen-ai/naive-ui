import create from '../../_styles/utils/create-component-base'
import sizeVarables from './_common'

export default create({
  theme: 'light',
  name: 'Empty',
  getDerivedVars (vars) {
    const {
      textColorDisabled,
      iconColorOverlay,
      textColor2
    } = vars
    return {
      ...sizeVarables,
      textColor: textColorDisabled,
      iconColor: iconColorOverlay,
      extraTextColor: textColor2
    }
  }
})

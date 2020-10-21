import create from '../../_styles/utils/create-component-base'
import sizeVarables from './_common'

export default create({
  theme: 'dark',
  name: 'Empty',
  getDerivedVariables ({ derived }) {
    const {
      textColorDisabledOverlay,
      iconColorOverlay,
      textColor2Overlay
    } = derived
    return {
      ...sizeVarables,
      textColor: textColorDisabledOverlay,
      iconColor: iconColorOverlay,
      extraTextColor: textColor2Overlay
    }
  }
})

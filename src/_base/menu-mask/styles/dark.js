import create from '../../../styles/_utils/create-component-base'
import { changeColor } from '../../../_utils/color'

export default create({
  name: 'BaseMenuMask',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      color: changeColor(derived.popoverColor, {
        alpha: 0.75
      }),
      textColor: derived.textColorSecondaryOverlay
    }
  }
})

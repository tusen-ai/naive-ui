import create from '../../../styles/_utils/create-component-base'
import { changeColor } from '../../../_utils/color'

export default create({
  name: 'BaseMenuMask',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      color: changeColor(derived.popoverBackgroundColor, {
        alpha: 0.75
      }),
      textColor: derived.secondaryTextColor
    }
  }
})

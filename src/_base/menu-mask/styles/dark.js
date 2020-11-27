import create from '../../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  name: 'BaseMenuMask',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    return {
      color: changeColor(derived.popoverColor, {
        alpha: 0.75
      }),
      textColor: derived.textColor2Overlay
    }
  }
})

import create from '../../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'

export default create({
  name: 'BaseMenuMask',
  theme: 'dark',
  getDerivedVars (vars) {
    return {
      color: changeColor(vars.popoverColor, {
        alpha: 0.75
      }),
      textColor: vars.textColor2Overlay
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import sizeVarables from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon'

export default create({
  theme: 'light',
  name: 'Empty',
  peer: [
    baseLight,
    iconLight
  ],
  getLocalVars (vars) {
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

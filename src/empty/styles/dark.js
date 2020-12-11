import create from '../../_styles/utils/create-component-base'
import sizeVarables from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon'

export default create({
  theme: 'dark',
  name: 'Empty',
  peer: [
    baseDark,
    iconDark
  ],
  getLocalVars (vars) {
    const {
      textColorDisabledOverlay,
      iconColorOverlay,
      textColor2Overlay
    } = vars
    return {
      ...sizeVarables,
      textColor: textColorDisabledOverlay,
      iconColor: iconColorOverlay,
      extraTextColor: textColor2Overlay
    }
  }
})

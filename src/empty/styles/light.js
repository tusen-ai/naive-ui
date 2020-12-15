import create from '../../_styles/utils/create-component-base'
import sizeVarables from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  theme: 'light',
  name: 'Empty',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    const {
      textColorDisabled,
      iconColorOverlay,
      textColor2,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge
    } = vars
    return {
      ...sizeVarables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      fontSizeHuge,
      textColor: textColorDisabled,
      iconColor: iconColorOverlay,
      extraTextColor: textColor2
    }
  }
})

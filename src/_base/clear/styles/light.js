import commonVariables from './_common'
import { scaleColor } from 'seemly'
import { commonLight } from '../../../_styles/new-common'

export default {
  name: 'BaseClear',
  common: commonLight,
  self (vars) {
    const { textColor4Overlay } = vars
    return {
      ...commonVariables,
      color: textColor4Overlay,
      colorHover: scaleColor(textColor4Overlay, { alpha: 0.75 }),
      colorPressed: scaleColor(textColor4Overlay, { alpha: 1.25 })
    }
  }
}

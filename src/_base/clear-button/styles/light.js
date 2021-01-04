import commonVariables from './_common'
import { scaleColor } from 'seemly'
import { commonLight } from '../../../_styles/new-common'
import { iconLight } from '../../../icon/styles'

export default {
  name: 'BaseClearButton',
  common: commonLight,
  peers: {
    Icon: iconLight
  },
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

import commonVariables from './_common'
import { scaleColor } from 'seemly'
import { commonDark } from '../../../_styles/new-common'
import { iconDark } from '../../../icon/styles'

export default {
  name: 'BaseClearButton',
  common: commonDark,
  peers: {
    Icon: iconDark
  },
  self (vars) {
    const { textColor4Overlay } = vars
    return {
      ...commonVariables,
      color: textColor4Overlay,
      colorHover: scaleColor(textColor4Overlay, { alpha: 1.25 }),
      colorPressed: scaleColor(textColor4Overlay, { alpha: 0.75 })
    }
  }
}

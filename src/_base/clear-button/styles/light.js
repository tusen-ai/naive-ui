import create from '../../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { scaleColor } from 'seemly'

export default create({
  name: 'BaseClearButton',
  theme: 'light',
  getLocalVars (vars) {
    const { textColor4Overlay } = vars
    return {
      ...commonVariables,
      color: textColor4Overlay,
      colorHover: scaleColor(textColor4Overlay, { alpha: 0.75 }),
      colorPressed: scaleColor(textColor4Overlay, { alpha: 1.25 })
    }
  }
})

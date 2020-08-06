import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor,
      primaryActiveColor
    } = derived
    return {
      backTopButtonFill: {
        default: 'rgba(255,255,255,0.3)',
        hover: primaryColor,
        active: primaryActiveColor
      },
      backTopBoxShadow: {
        default: ' 0 2px 8px 0px rgba(0, 0, 0, .12)',
        hover: `0 2px 12px 0px ${changeColor(primaryColor, { alpha: 0.5 })}`,
        active: `0 2px 12px 0px ${changeColor(primaryColor, { alpha: 0.5 })}`
      }
    }
  }
})

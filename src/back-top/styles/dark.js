import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor,
      primaryColorHover,
      primaryColorActive
    } = derived
    return {
      backTopFill: 'rgba(255,255,255,0.3)',
      backTopButtonHover: primaryColorHover,
      backTopButtonCctive: primaryColorActive,
      backTopBoxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      backTopBoxShadowHover: `0 2px 12px 0px ${changeColor(primaryColor, { alpha: 0.5 })}`,
      backTopBoxShadowActive: `0 2px 12px 0px ${changeColor(primaryColor, { alpha: 0.5 })}`
    }
  }
})

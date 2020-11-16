import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor,
      primaryColorHover,
      primaryColorPressed
    } = derived
    return {
      color: 'rgba(255,255,255,0.3)',
      colorHover: primaryColorHover,
      colorPressed: primaryColorPressed,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: `0 2px 12px 0px ${changeColor(primaryColor, { alpha: 0.5 })}`,
      boxShadowPressed: `0 2px 12px 0px ${changeColor(primaryColor, { alpha: 0.5 })}`
    }
  }
})

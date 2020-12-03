import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common.js'

export default create({
  theme: 'light',
  name: 'BackTop',
  getLocalVars (vars) {
    const {
      popoverColor,
      textColor2,
      primaryColorHover,
      primaryColorPressed
    } = vars
    return {
      ...commonVariables,
      color: popoverColor,
      iconColor: textColor2,
      iconColorHover: primaryColorHover,
      iconColorPressed: primaryColorPressed,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
})

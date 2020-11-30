import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Breadcrumb',
  getDerivedVars (vars) {
    return {
      ...commonVariables,
      itemTextColor: vars.textColor3Overlay,
      itemTextColorHover: vars.primaryColorHover,
      itemTextColorPressed: vars.primaryColorPressed,
      itemTextColorActive: vars.textColor2Overlay,
      separatorColor: vars.textColor3Overlay
    }
  }
})

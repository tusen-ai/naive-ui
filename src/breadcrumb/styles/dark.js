import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Breadcrumb',
  peer: [baseDark],
  getLocalVars (vars) {
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

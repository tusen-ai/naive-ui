import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Breadcrumb',
  peer: [baseLight],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      itemTextColor: vars.textColor3,
      itemTextColorHover: vars.primaryColorHover,
      itemTextColorPressed: vars.primaryColorPressed,
      itemTextColorActive: vars.textColor2,
      separatorColor: vars.textColor3
    }
  }
})

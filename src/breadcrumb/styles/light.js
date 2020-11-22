import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      itemTextColor: derived.textColor3,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorPressed: derived.primaryColorPressed,
      itemTextColorActive: derived.textColor2,
      separatorColor: derived.textColor3
    }
  }
})

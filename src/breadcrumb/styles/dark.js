import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Breadcrumb',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      itemTextColor: derived.textColor3Overlay,
      itemTextColorHover: derived.primaryColorHover,
      itemTextColorPressed: derived.primaryColorPressed,
      itemTextColorActive: derived.textColor2Overlay,
      separatorColor: derived.textColor3Overlay
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import iconStyle from '../../icon/styles/dark'

export default create({
  theme: 'dark',
  name: 'Rate',
  peer: [
    iconStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      itemColor: derived.railColor,
      itemColorActive: '#CCAA33'
    }
  }
})

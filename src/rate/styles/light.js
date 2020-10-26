import create from '../../_styles/utils/create-component-base'
import iconStyle from '../../icon/styles/dark'

export default create({
  theme: 'light',
  name: 'Rate',
  peer: [
    iconStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {
      itemColor: derived.railColor,
      itemColorActive: '#FFCC33'
    }
  }
})

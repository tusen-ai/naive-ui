import create from '../../_styles/utils/create-component-base'
import iconStyle from '../../icon/styles/dark'

export default create({
  theme: 'light',
  name: 'Rate',
  peer: [
    iconStyle
  ],
  getDerivedVars (vars) {
    return {
      itemColor: vars.railColor,
      itemColorActive: '#FFCC33'
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import iconStyle from '../../icon/styles/dark'

export default create({
  theme: 'dark',
  name: 'Rate',
  peer: [
    iconStyle
  ],
  getLocalVars (vars) {
    return {
      itemColor: vars.railColor,
      itemColorActive: '#CCAA33'
    }
  }
})

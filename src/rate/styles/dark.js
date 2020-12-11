import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'

export default create({
  theme: 'dark',
  name: 'Rate',
  peer: [
    baseDark,
    iconDark
  ],
  getLocalVars (vars) {
    return {
      itemColor: vars.railColor,
      itemColorActive: '#CCAA33'
    }
  }
})

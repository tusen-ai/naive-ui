import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  theme: 'light',
  name: 'Rate',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    return {
      itemColor: vars.railColor,
      itemColorActive: '#FFCC33'
    }
  }
})

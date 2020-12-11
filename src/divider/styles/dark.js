import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  theme: 'dark',
  name: 'Divider',
  peer: [
    baseDark
  ],
  getLocalVars (vars) {
    const {
      textColor1Overlay,
      dividerColorOverlay
    } = vars
    return {
      textColor: textColor1Overlay,
      color: dividerColorOverlay,
      fontWeight: vars.fontWeightStrong
    }
  }
})

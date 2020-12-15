import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'
import { buttonDark } from '../../button/styles'
import { popoverDark } from '../../popover/styles'

export default create({
  name: 'Popconfirm',
  theme: 'dark',
  peer: [baseDark, iconDark, buttonDark, popoverDark],
  getLocalVars (vars) {
    return {
      fontSize: vars.fontSize,
      iconColor: vars.warningColor
    }
  }
})

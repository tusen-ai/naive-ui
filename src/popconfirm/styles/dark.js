import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon'
import { buttonDark } from '../../button'
import { popoverDark } from '../../popover'

export default create({
  name: 'Popconfirm',
  theme: 'dark',
  peer: [
    baseDark,
    iconDark,
    buttonDark,
    popoverDark
  ],
  getLocalVars (vars) {
    return {
      iconColor: vars.warningColor
    }
  }
})

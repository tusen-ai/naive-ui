import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon'
import { buttonLight } from '../../button'
import { popoverLight } from '../../popover'

export default create({
  name: 'Popconfirm',
  theme: 'light',
  peer: [
    baseLight,
    iconLight,
    buttonLight,
    popoverLight
  ],
  getLocalVars (vars) {
    return {
      iconColor: vars.warningColor
    }
  }
})

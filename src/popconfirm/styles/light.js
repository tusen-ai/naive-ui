import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'
import { buttonLight } from '../../button/styles'
import { popoverLight } from '../../popover/styles'

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

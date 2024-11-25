import type { FloatButtonGroupTheme } from './light'
import { commonDark } from '../../_styles/common'

const floatButtonGroupDark: FloatButtonGroupTheme = {
  name: 'FloatButtonGroup',
  common: commonDark,
  self(vars) {
    const { popoverColor, dividerColor, borderRadius } = vars
    return {
      color: popoverColor,
      buttonBorderColor: dividerColor,
      borderRadiusSquare: borderRadius,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)'
    }
  }
}

export default floatButtonGroupDark

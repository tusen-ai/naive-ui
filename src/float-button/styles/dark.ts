import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { FloatButtonTheme } from './light'

const floatButtonDark: FloatButtonTheme = {
  name: 'FloatButton',
  common: commonDark,
  self (vars) {
    const { popoverColor } = vars
    return {
      ...commonVariables,
      color: popoverColor,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
}

export default floatButtonDark

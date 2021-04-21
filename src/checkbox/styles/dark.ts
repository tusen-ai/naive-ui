import { commonDark } from '../../_styles/common'
import type { CheckboxTheme } from './light'
import { self } from './light'

const checkboxDark: CheckboxTheme = {
  name: 'Checkbox',
  common: commonDark,
  self (vars) {
    const { cardColor } = vars
    const commonSelf = self(vars)
    commonSelf.color = '#0000'
    commonSelf.checkMarkColor = cardColor
    return commonSelf
  }
}

export default checkboxDark

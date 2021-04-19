import { commonDark } from '../../_styles/common'
import type { ButtonTheme } from './light'
import { self } from './light'

const buttonDark: ButtonTheme = {
  name: 'Button',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    commonSelf.waveOpacity = '0.8'
    return commonSelf
  }
}

export default buttonDark

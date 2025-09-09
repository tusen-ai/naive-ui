import type { TypewriterTheme } from './light'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const typewriterDark: TypewriterTheme = {
  name: 'Typewriter',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default typewriterDark

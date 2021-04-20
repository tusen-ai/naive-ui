import { commonDark } from '../../_styles/common'
import type { ProgressTheme } from './light'
import { self } from './light'

const progressDark: ProgressTheme = {
  name: 'Progress',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    commonSelf.textColorLineInner = 'rgb(0, 0, 0)'
    commonSelf.lineBgProcessing =
      'linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)'
    return commonSelf
  }
}

export default progressDark

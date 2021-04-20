import { changeColor } from 'seemly'
import { checkboxDark } from '../../checkbox/styles'
import { commonDark } from '../../_styles/common'
import type { TreeTheme } from './light'
import { self } from './light'

const treeDark: TreeTheme = {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark
  },
  self (vars) {
    const { primaryColor } = vars
    const commonSelf = self(vars)
    commonSelf.nodeColorActive = changeColor(primaryColor, { alpha: 0.15 })
    return commonSelf
  }
}

export default treeDark

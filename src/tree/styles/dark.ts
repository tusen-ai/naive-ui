import type { TreeTheme } from './light'
import { changeColor } from 'seemly'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { checkboxDark } from '../../checkbox/styles'
import { emptyDark } from '../../empty/styles'
import { self } from './light'

const treeDark: TreeTheme = {
  name: 'Tree',
  common: commonDark,
  peers: {
    Checkbox: checkboxDark,
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self(vars) {
    const { primaryColor } = vars
    const commonSelf = self(vars)
    commonSelf.nodeColorActive = changeColor(primaryColor, { alpha: 0.15 })
    return commonSelf
  }
}

export default treeDark

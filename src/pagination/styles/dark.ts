import { changeColor } from 'seemly'
import { selectDark } from '../../select/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/common'
import type { PaginationTheme } from './light'
import { self } from './light'

const paginationDark: PaginationTheme = {
  name: 'Pagination',
  common: commonDark,
  peers: {
    Select: selectDark,
    Input: inputDark
  },
  self (vars) {
    const { primaryColor, opacity3 } = vars
    const borderColorActive = changeColor(primaryColor, {
      alpha: Number(opacity3)
    })
    const commonSelf = self(vars)
    commonSelf.itemBorderActive = `1px solid ${borderColorActive}`
    commonSelf.itemBorderDisabled = '1px solid #0000'
    return commonSelf
  }
}

export default paginationDark

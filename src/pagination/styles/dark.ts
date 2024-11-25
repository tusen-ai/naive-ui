import type { PaginationTheme } from './light'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import { inputDark } from '../../input/styles'
import { popselectDark } from '../../popselect/styles'
import { selectDark } from '../../select/styles'
import { self } from './light'

const paginationDark: PaginationTheme = {
  name: 'Pagination',
  common: commonDark,
  peers: {
    Select: selectDark,
    Input: inputDark,
    Popselect: popselectDark
  },
  self(vars) {
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

import type { Theme } from '../../_mixins'
import { commonDark } from '../../_styles/common'

const rowDark: Theme<'Row'> = {
  name: 'Row',
  common: commonDark
}

export default rowDark
export type RowTheme = typeof rowDark

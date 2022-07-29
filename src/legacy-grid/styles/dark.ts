import { commonDark } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const rowDark: Theme<'Row'> = {
  name: 'Row',
  common: commonDark
}

export default rowDark
export type RowTheme = typeof rowDark

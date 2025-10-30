import type { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

const rowLight: Theme<'Row'> = {
  name: 'Row',
  common: commonLight
}

export default rowLight
export type RowTheme = typeof rowLight

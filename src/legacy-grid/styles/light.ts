import { commonLight } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const rowLight: Theme<'Row'> = {
  name: 'Row',
  common: commonLight
}

export default rowLight
export type RowTheme = typeof rowLight

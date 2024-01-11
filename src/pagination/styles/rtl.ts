import type { RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { inputRtl } from '../../input/styles/rtl'
import { selectRtl } from '../../select/styles'

export const paginationRtl: RtlItem = {
  name: 'Pagination',
  style: rtlStyle,
  peers: [inputRtl, selectRtl]
}

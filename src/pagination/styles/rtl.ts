import type { RtlItem } from '../../config-provider/src/internal-interface'
import { inputRtl } from '../../input/styles/rtl'
import { selectRtl } from '../../select/styles'
import rtlStyle from '../src/styles/rtl.cssr'

export const paginationRtl: RtlItem = {
  name: 'Pagination',
  style: rtlStyle,
  peers: [inputRtl, selectRtl]
}

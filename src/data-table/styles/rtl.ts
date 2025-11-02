import type { RtlItem } from '../../config-provider/src/internal-interface'
import { scrollbarRtl } from '../../_internal/scrollbar/styles'
import { paginationRtl } from '../../pagination/styles'
import rtlStyle from '../src/styles/rtl.cssr'

export const DataTableRtl: RtlItem = {
  name: 'DataTable',
  style: rtlStyle,
  peers: [scrollbarRtl, paginationRtl]
}

import type { RtlItem } from '../../config-provider/src/internal-interface'
import { scrollbarRtl } from '../../_internal/scrollbar/styles/rtl'
import rtlStyle from '../src/styles/rtl.cssr'

export const popoverRtl: RtlItem = {
  name: 'Popover',
  style: rtlStyle,
  peers: [scrollbarRtl]
}

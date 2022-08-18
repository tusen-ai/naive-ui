import type { RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { scrollbarRtl } from '../../_internal/scrollbar/styles/rtl'

export const drawerRtl: RtlItem = {
  name: 'Drawer',
  style: rtlStyle,
  peers: [scrollbarRtl]
}

export default drawerRtl

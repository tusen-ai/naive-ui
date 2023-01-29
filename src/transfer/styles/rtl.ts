import type { RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { buttonRtl } from '../../button/styles'
import { checkboxRtl } from '../../checkbox/styles'
import { scrollbarRtl } from '../../_internal/scrollbar/styles'
import { treeRtl } from '../../tree/styles'

export const transferRtl: RtlItem = {
  name: 'Transfer',
  style: rtlStyle,
  peers: [buttonRtl, checkboxRtl, scrollbarRtl, treeRtl]
}

export default transferRtl

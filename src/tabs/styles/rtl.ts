import type { RtlItem } from '../../config-provider/src/internal-interface'
import { buttonRtl } from '../../button/styles'
import rtlStyle from '../src/styles/rtl.cssr'

export const tabsRtl: RtlItem = {
  name: 'Tabs',
  style: rtlStyle,
  peers: [buttonRtl]
}

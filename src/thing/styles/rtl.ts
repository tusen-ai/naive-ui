import type { RtlItem } from '../../config-provider/src/internal-interface'
import { buttonRtl } from '../../button/styles/rtl'
import { spaceRtl } from '../../space/styles/rtl'
import rtlStyle from '../src/styles/rtl.cssr'

export const thingRtl: RtlItem = {
  name: 'Thing',
  style: rtlStyle,
  peers: [buttonRtl, spaceRtl]
}

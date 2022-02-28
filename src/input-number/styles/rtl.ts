import type { RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { inputRtl } from '../../input/styles/rtl'
import { buttonRtl } from '../../button/styles/rtl'

export const inputNumberRtl: RtlItem = {
  name: 'InputNumber',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl]
}

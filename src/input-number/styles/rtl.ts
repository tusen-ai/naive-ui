import type { RtlItem } from '../../config-provider/src/internal-interface'
import { buttonRtl } from '../../button/styles/rtl'
import { inputRtl } from '../../input/styles/rtl'
import rtlStyle from '../src/styles/rtl.cssr'

export const inputNumberRtl: RtlItem = {
  name: 'InputNumber',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl]
}

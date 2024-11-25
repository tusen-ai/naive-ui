import type { RtlItem } from '../../config-provider/src/internal-interface'
import { buttonRtl } from '../../button/styles/rtl'
import { buttonGroupRtl } from '../../button-group/styles/rtl'
import { checkboxRtl } from '../../checkbox/styles/rtl'
import { inputRtl } from '../../input/styles/rtl'
import { inputNumberRtl } from '../../input-number/styles/rtl'
import rtlStyle from '../src/styles/rtl.cssr'

export const dynamicInputRtl: RtlItem = {
  name: 'DynamicInput',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl, buttonGroupRtl, checkboxRtl, inputNumberRtl]
}

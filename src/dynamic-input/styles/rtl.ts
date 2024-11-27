import type { RtlItem } from '../../config-provider/src/internal-interface'
import { buttonGroupRtl } from '../../button-group/styles/rtl'
import { buttonRtl } from '../../button/styles/rtl'
import { checkboxRtl } from '../../checkbox/styles/rtl'
import { inputNumberRtl } from '../../input-number/styles/rtl'
import { inputRtl } from '../../input/styles/rtl'
import rtlStyle from '../src/styles/rtl.cssr'

export const dynamicInputRtl: RtlItem = {
  name: 'DynamicInput',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl, buttonGroupRtl, checkboxRtl, inputNumberRtl]
}

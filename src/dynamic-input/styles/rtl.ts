import type { RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { inputRtl } from '../../input/styles/rtl'
import { buttonRtl } from '../../button/styles/rtl'
import { buttonGroupRtl } from '../../button-group/styles/rtl'
import { checkboxRtl } from '../../checkbox/styles/rtl'
import { inputNumberRtl } from '../../input-number/styles/rtl'

export const dynamicInputRtl: RtlItem = {
  name: 'DynamicInput',
  style: rtlStyle,
  peers: [inputRtl, buttonRtl, buttonGroupRtl, checkboxRtl, inputNumberRtl]
}

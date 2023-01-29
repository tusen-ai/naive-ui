import type { RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { buttonRtl } from '../../button/styles'

export const uploadRtl: RtlItem = {
  name: 'Upload',
  style: rtlStyle,
  peers: [buttonRtl]
}

export default uploadRtl

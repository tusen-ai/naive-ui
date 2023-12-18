import { commonDark } from '../../_styles/common'
import { type QrCodeTheme } from './light'

const qrcodeDark: QrCodeTheme = {
  name: 'QrCode',
  common: commonDark,
  self: (vars) => {
    return {
      borderRadius: vars.borderRadius
    }
  }
}

export default qrcodeDark

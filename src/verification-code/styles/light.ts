import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  return {

  }
}

const verificationCodeLight = createTheme({
  name: 'VerificationCode',
  common: commonLight,
  peers: {
  },
  self
})

export default verificationCodeLight
export type VerificationCodeTheme = typeof verificationCodeLight

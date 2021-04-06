import { createTheme } from '../../_mixins'
import { commonDark } from '../../_styles/common'
import type { GlobalStyleTheme } from './light'

export const globalStyleDark: GlobalStyleTheme = createTheme({
  name: 'GlobalStyle',
  common: commonDark
})

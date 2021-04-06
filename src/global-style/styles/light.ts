import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export const globalStyleLight = createTheme({
  name: 'GlobalStyle',
  common: commonLight
})

export type GlobalStyleTheme = typeof globalStyleLight
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalStyleThemeVars {}

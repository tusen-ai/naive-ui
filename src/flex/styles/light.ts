import type { Theme } from '../../_mixins'
import commonVars from './_common'

const self = () => {
  return commonVars
}

export type FlexThemeVars = ReturnType<typeof self>

const flexLight: Theme<'Flex', FlexThemeVars> = {
  name: 'Flex',
  self
}

export default flexLight
export type FlexTheme = typeof flexLight

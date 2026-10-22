import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import commonVars from './_common'

function self() {
  return commonVars
}

export interface FlexThemeVars extends ReturnType<typeof self> {}

const flexLight: FlexTheme = {
  name: 'Flex',
  self
}

export interface FlexTheme extends Theme<'Flex', FlexThemeVars> {}

export interface FlexThemeOverrides extends ExtractThemeOverrides<FlexTheme> {}

export default flexLight

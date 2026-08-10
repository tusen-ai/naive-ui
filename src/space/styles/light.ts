import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import commonVars from './_common'

function self() {
  return commonVars
}

export interface SpaceThemeVars extends ReturnType<typeof self> {}

const spaceLight: SpaceTheme = {
  name: 'Space',
  self
}

export interface SpaceTheme extends Theme<'Space', SpaceThemeVars> {}

export interface SpaceThemeOverrides extends ExtractThemeOverrides<SpaceTheme> {}

export default spaceLight

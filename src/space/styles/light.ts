import type { Theme } from '../../_mixins'
import commonVars from './_common'

const self = () => {
  return commonVars
}

export type SpaceThemeVars = ReturnType<typeof self>

const spaceLight: Theme<'Space', SpaceThemeVars> = {
  name: 'Space',
  self
}

export default spaceLight
export type SpaceTheme = typeof spaceLight

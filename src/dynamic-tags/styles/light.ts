import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
import type { SpaceTheme } from '../../space/styles'
import type { TagTheme } from '../../tag/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import { spaceLight } from '../../space/styles'
import { tagLight } from '../../tag/styles'

export function self() {
  return {
    inputWidth: '64px'
  }
}

export interface DynamicTagsThemeVars extends ReturnType<typeof self> {}

const dynamicTagsLight: DynamicTagsTheme = createTheme({
  name: 'DynamicTags',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    Tag: tagLight,
    Space: spaceLight
  },
  self
})

export interface DynamicTagsTheme extends Theme<
  'DynamicTags',
  DynamicTagsThemeVars,
  {
    Input: InputTheme
    Button: ButtonTheme
    Tag: TagTheme
    Space: SpaceTheme
  }
> {}

export interface DynamicTagsThemeOverrides extends ExtractThemeOverrides<DynamicTagsTheme> {}

export default dynamicTagsLight

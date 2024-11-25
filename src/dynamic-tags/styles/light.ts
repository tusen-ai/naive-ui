import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import { spaceLight } from '../../space/styles'
import { tagLight } from '../../tag/styles'

const dynamicTagsLight = createTheme({
  name: 'DynamicTags',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    Tag: tagLight,
    Space: spaceLight
  },
  self() {
    return {
      inputWidth: '64px'
    }
  }
})

export default dynamicTagsLight
export interface DynamicTagsThemeVars {}
export type DynamicTagsTheme = typeof dynamicTagsLight

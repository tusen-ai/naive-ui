import { tagLight } from '../../tag/styles'
import { inputLight } from '../../input/styles'
import { buttonLight } from '../../button/styles'
import { spaceLight } from '../../space/styles'
import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const dynamicTagsLight = createTheme({
  name: 'DynamicTags',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    Tag: tagLight,
    Space: spaceLight
  },
  self () {
    return {
      inputWidth: '64px'
    }
  }
})

export default dynamicTagsLight
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DynamicTagsThemeVars {}
export type DynamicTagsTheme = typeof dynamicTagsLight

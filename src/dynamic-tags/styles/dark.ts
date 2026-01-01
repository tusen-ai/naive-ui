import type { DynamicTagsTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'
import { spaceDark } from '../../space/styles'
import { tagDark } from '../../tag/styles'

const dynamicTagsDark: DynamicTagsTheme = {
  name: 'DynamicTags',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Tag: tagDark,
    Space: spaceDark
  },
  self() {
    return {
      inputWidth: '64px'
    }
  }
}

export default dynamicTagsDark

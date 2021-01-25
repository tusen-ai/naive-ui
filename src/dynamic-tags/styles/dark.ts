import { tagDark } from '../../tag/styles'
import { inputDark } from '../../input/styles'
import { buttonDark } from '../../button/styles'
import { commonDark } from '../../_styles/new-common'
import type { DynamicTagsTheme } from './light'

const dynamicTagsDark: DynamicTagsTheme = {
  name: 'DynamicTags',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Tag: tagDark
  }
}

export default dynamicTagsDark

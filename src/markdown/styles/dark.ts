import type { MarkdownTheme } from './light'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const markdownDark: MarkdownTheme = {
  name: 'Markdown',
  common: commonDark,
  self(vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default markdownDark

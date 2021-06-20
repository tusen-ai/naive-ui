import { emptyDark } from '../../empty/styles'
import { treeDark } from '../../tree/styles'
import { commonDark } from '../../_styles/common'
import { internalSelectionDark } from '../../_internal/selection/styles'
import type { TreeSelectTheme } from './light'

const treeSelectDark: TreeSelectTheme = {
  name: 'TreeSelect',
  common: commonDark,
  peers: {
    Tree: treeDark,
    Empty: emptyDark,
    InternalSelection: internalSelectionDark
  }
}

export default treeSelectDark

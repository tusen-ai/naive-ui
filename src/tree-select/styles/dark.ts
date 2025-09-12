import type { TreeSelectTheme } from './light'
import { internalSelectionDark } from '../../_internal/selection/styles'
import { commonDark } from '../../_styles/common'
import { emptyDark } from '../../empty/styles'
import { treeDark } from '../../tree/styles'

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

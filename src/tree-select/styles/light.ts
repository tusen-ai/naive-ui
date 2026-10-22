import type { InternalSelectionTheme } from '../../_internal/selection/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import type { EmptyTheme } from '../../empty/styles'
import type { TreeTheme } from '../../tree/styles'
import { internalSelectionLight } from '../../_internal/selection/styles'
import { createTheme } from '../../_mixins/use-theme'
import { commonLight } from '../../_styles/common'
import { emptyLight } from '../../empty/styles'
import { treeLight } from '../../tree/styles'

export function self(vars: ThemeCommonVars) {
  const {
    popoverColor,
    boxShadow2,
    borderRadius,
    heightMedium,
    dividerColor,
    textColor2
  } = vars
  return {
    menuPadding: '4px',
    menuColor: popoverColor,
    menuBoxShadow: boxShadow2,
    menuBorderRadius: borderRadius,
    menuHeight: `calc(${heightMedium} * 7.6)`,
    actionDividerColor: dividerColor,
    actionTextColor: textColor2,
    actionPadding: '8px 12px',
    headerDividerColor: dividerColor,
    headerTextColor: textColor2,
    headerPadding: '8px 12px'
  }
}

export interface TreeSelectThemeVars extends ReturnType<typeof self> {}

const treeSelectLight: TreeSelectTheme = createTheme({
  name: 'TreeSelect',
  common: commonLight,
  peers: {
    Tree: treeLight,
    Empty: emptyLight,
    InternalSelection: internalSelectionLight
  },
  self
})

export interface TreeSelectTheme extends Theme<
  'TreeSelect',
  TreeSelectThemeVars,
  {
    Tree: TreeTheme
    Empty: EmptyTheme
    InternalSelection: InternalSelectionTheme
  }
> {}

export interface TreeSelectThemeOverrides extends ExtractThemeOverrides<TreeSelectTheme> {}

export default treeSelectLight

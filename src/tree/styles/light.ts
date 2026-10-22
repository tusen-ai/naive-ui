import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import type { CheckboxTheme } from '../../checkbox/styles'
import type { EmptyTheme } from '../../empty/styles'
import { changeColor } from 'seemly'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins/use-theme'
import { commonLight } from '../../_styles/common'
import { checkboxLight } from '../../checkbox/styles'
import { emptyLight } from '../../empty/styles'

export function self(vars: ThemeCommonVars) {
  const {
    borderRadiusSmall,
    dividerColor,
    hoverColor,
    pressedColor,
    primaryColor,
    textColor3,
    textColor2,
    textColorDisabled,
    fontSize
  } = vars
  return {
    fontSize,
    lineHeight: '1.5',
    nodeHeight: '30px',
    nodeWrapperPadding: '3px 0',
    nodeBorderRadius: borderRadiusSmall,
    nodeColorHover: hoverColor,
    nodeColorPressed: pressedColor,
    nodeColorActive: changeColor(primaryColor, { alpha: 0.1 }),
    arrowColor: textColor3,
    nodeTextColor: textColor2,
    nodeTextColorDisabled: textColorDisabled,
    loadingColor: primaryColor,
    dropMarkColor: primaryColor,
    lineColor: dividerColor
  }
}

export interface TreeThemeVars extends ReturnType<typeof self> {}

const treeLight: TreeTheme = createTheme({
  name: 'Tree',
  common: commonLight,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Empty: emptyLight
  },
  self
})

export interface TreeTheme extends Theme<
  'Tree',
  TreeThemeVars,
  {
    Checkbox: CheckboxTheme
    Scrollbar: ScrollbarTheme
    Empty: EmptyTheme
  }
> {}

export interface TreeThemeOverrides extends ExtractThemeOverrides<TreeTheme> {}

export default treeLight

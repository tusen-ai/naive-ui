import type { ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import { ImageTheme } from '../styles'

export interface MoveStrategy {
  moveVerticalDirection: 'verticalTop' | 'verticalBottom'
  moveHorizontalDirection: 'horizontalLeft' | 'horizontalRight'
  deltaHorizontal: number
  deltaVertical: number
}

export const imagePreviewSharedProps = {
  ...(useTheme.props as ThemeProps<ImageTheme>),
  showToolbar: { type: Boolean, default: true },
  showToolbarTooltip: Boolean
}

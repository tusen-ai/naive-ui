import { ImgHTMLAttributes, Ref } from 'vue'
import type { ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
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

export interface ImageContext {
  previewedImgPropsRef: Ref<ImgHTMLAttributes>
}

export const imageContextKey = createInjectionKey<ImageContext>('n-image')

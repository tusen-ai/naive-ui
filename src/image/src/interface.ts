import type { ImgHTMLAttributes, PropType, Ref } from 'vue'
import type { ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { ImageTheme } from '../styles'
import type { ImageRenderToolbar } from './public-types'

export interface MoveStrategy {
  moveVerticalDirection: 'verticalTop' | 'verticalBottom'
  moveHorizontalDirection: 'horizontalLeft' | 'horizontalRight'
  deltaHorizontal: number
  deltaVertical: number
}

export const imagePreviewSharedProps = {
  ...(useTheme.props as ThemeProps<ImageTheme>),
  onPreviewPrev: Function as PropType<() => void>,
  onPreviewNext: Function as PropType<() => void>,
  showToolbar: { type: Boolean, default: true },
  showToolbarTooltip: Boolean,
  renderToolbar: Function as PropType<ImageRenderToolbar>
}

export interface ImageContext {
  previewedImgPropsRef: Ref<ImgHTMLAttributes | undefined>
}

export const imageContextKey = createInjectionKey<ImageContext>('n-image')

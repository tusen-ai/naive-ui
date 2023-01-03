import { ImgHTMLAttributes, PropType, Ref } from 'vue'
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
  showToolbarTooltip: Boolean,
  previewActions: {
    type: Array as PropType<
    Array<
    | 'prev'
    | 'next'
    | 'rotate-left'
    | 'rotate-right'
    | 'resize'
    | 'zoom-out'
    | 'zoom-in'
    | 'close'
    >
    >,
    default: [
      'prev',
      'next',
      'rotate-left',
      'rotate-right',
      'resize',
      'zoom-out',
      'zoom-in',
      'close'
    ]
  }
}

export interface ImageContext {
  previewedImgPropsRef: Ref<ImgHTMLAttributes>
}

export const imageContextKey = createInjectionKey<ImageContext>('n-image')

import type { ImgHTMLAttributes, PropType, Ref, VNode, VNodeChild } from 'vue'
import type { ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { ImageTheme } from '../styles'

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
  renderToolbar: Function as PropType<(nodes: ToolbarNodes) => VNodeChild>
}

export interface ImageContext {
  previewedImgPropsRef: Ref<ImgHTMLAttributes | undefined>
}

export const imageContextKey = createInjectionKey<ImageContext>('n-image')

export interface ToolbarNodes {
  prev: VNode
  next: VNode
  rotateLeft: VNode
  rotateRight: VNode
  originalSize: VNode
  zoomOut: VNode
  zoomIn: VNode
  download: VNode
  close: VNode
}

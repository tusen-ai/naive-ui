import type { VNode, VNodeChild } from 'vue'

export interface ImageRenderToolbarProps {
  nodes: {
    prev: VNode
    next: VNode
    rotateCounterclockwise: VNode
    rotateClockwise: VNode
    resizeToOriginalSize: VNode
    zoomOut: VNode
    zoomIn: VNode
    download: VNode
    close: VNode
  }
}

export type ImageRenderToolbar = (props: ImageRenderToolbarProps) => VNodeChild
export type ImageGroupRenderToolbarProps = ImageRenderToolbarProps
export type ImageGroupRenderToolbar = ImageRenderToolbar

export interface ImageInst {
  click: () => void
  showPreview: () => void
}

export interface ImageSlots {
  placeholder?: ImagePlaceholderSlot
  error?: ImageErrorSlot
}

export type ImagePlaceholderSlot = () => VNode[]
export type ImageErrorSlot = () => VNode[]

export interface ImagePreviewInst {
  setThumbnailEl: (e: HTMLImageElement | null) => void
}

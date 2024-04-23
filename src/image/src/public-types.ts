import type { VNode, VNodeChild } from 'vue'

export interface ImageRenderToolbarProps {
  originalNodes: {
    prev: VNode
    next: VNode
    rotateLeft: VNode
    rotateRight: VNode
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

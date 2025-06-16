import type { VNode } from 'vue'

export interface AnchorLinkSlots {
  default?: () => VNode[]
  title?: () => VNode[]
}

import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTimelineImpl from './src/Timeline'
import NTimelineItemImpl from './src/TimelineItem'

export { timelineProps } from './src/Timeline'
export type { TimelineProps } from './src/Timeline'
export { timelineItemProps } from './src/TimelineItem'
export type { TimelineItemProps, TimelineItemSlots } from './src/TimelineItem'

export const NTimeline: WithNativeAttrs<typeof NTimelineImpl, HTMLAttributes>
  = NTimelineImpl
export const NTimelineItem: WithNativeAttrs<
  typeof NTimelineItemImpl,
  HTMLAttributes
> = NTimelineItemImpl

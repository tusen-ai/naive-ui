import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NMentionImpl from './src/Mention'

export type { MentionInst, MentionOption } from './src/interface'
export { mentionProps } from './src/Mention'
export type { MentionProps, MentionSlots } from './src/Mention'
export type * from './src/public-types'

export const NMention: WithNativeAttrs<typeof NMentionImpl, HTMLAttributes>
  = NMentionImpl

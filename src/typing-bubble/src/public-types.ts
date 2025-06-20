import type { PropType } from 'vue'

export interface Options {
  interval?: number
  step?: number | number[]
  initialIndex?: number
}

export const TypingBubbleProps = {
  content: {
    type: String,
    default: ''
  },
  isTyping: {
    type: Boolean,
    default: false
  },
  isMarkdown: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object as PropType<Options>,
    default: {
      interval: 80,
      step: 1,
      initialIndex: 5
    }
  }
}

import { PropType } from 'vue'

export type Depth = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' | undefined

export const depth = 1

export default {
  depth: {
    type: [String, Number] as PropType<Depth>,
    default: undefined
  }
} as const

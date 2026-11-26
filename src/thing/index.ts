import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NThingImpl from './src/Thing'

export { thingProps } from './src/Thing'
export type { ThingProps, ThingSlots } from './src/Thing'

export const NThing: WithNativeAttrs<typeof NThingImpl, HTMLAttributes>
  = NThingImpl

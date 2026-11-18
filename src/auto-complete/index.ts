import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAutoCompleteImpl from './src/AutoComplete'

export { autoCompleteProps } from './src/AutoComplete'
export type { AutoCompleteProps, AutoCompleteSlots } from './src/AutoComplete'
export type {
  AutoCompleteDefaultSlotProps,
  AutoCompleteGroupOption,
  AutoCompleteInst,
  AutoCompleteOption
} from './src/interface'
export type * from './src/public-types'

export const NAutoComplete: WithNativeAttrs<
  typeof NAutoCompleteImpl,
  HTMLAttributes
> = NAutoCompleteImpl

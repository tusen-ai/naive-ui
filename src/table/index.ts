import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTableImpl from './src/Table'
import NTbodyImpl from './src/Tbody'
import NTdImpl from './src/Td'
import NThImpl from './src/Th'
import NTheadImpl from './src/Thead'
import NTrImpl from './src/Tr'

export type * from './src/public-types'
export { tableProps } from './src/Table'
export type { TableProps } from './src/Table'

export const NTable: WithNativeAttrs<typeof NTableImpl, TableHTMLAttributes>
  = NTableImpl
export const NTbody: WithNativeAttrs<typeof NTbodyImpl, HTMLAttributes>
  = NTbodyImpl
export const NTd: WithNativeAttrs<typeof NTdImpl, TdHTMLAttributes> = NTdImpl
export const NTh: WithNativeAttrs<typeof NThImpl, ThHTMLAttributes> = NThImpl
export const NThead: WithNativeAttrs<typeof NTheadImpl, HTMLAttributes>
  = NTheadImpl
export const NTr: WithNativeAttrs<typeof NTrImpl, HTMLAttributes> = NTrImpl

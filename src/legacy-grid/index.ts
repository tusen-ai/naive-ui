import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NColImpl from './src/Col'
import NRowImpl from './src/Row'

export { colProps } from './src/Col'
export type { ColProps } from './src/Col'
export { rowProps } from './src/Row'
export type { RowProps } from './src/Row'

export const NCol: WithNativeAttrs<typeof NColImpl, HTMLAttributes> = NColImpl
export const NRow: WithNativeAttrs<typeof NRowImpl, HTMLAttributes> = NRowImpl

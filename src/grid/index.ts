import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NGridImpl from './src/Grid'
import NGridItemImpl from './src/GridItem'

export { gridProps } from './src/Grid'
export type { GridProps } from './src/Grid'
export { gridItemProps } from './src/GridItem'
export { gridItemProps as giProps } from './src/GridItem'
export type { GridItemProps } from './src/GridItem'

export const NGrid: WithNativeAttrs<typeof NGridImpl, HTMLAttributes>
  = NGridImpl
export const NGridItem: WithNativeAttrs<typeof NGridItemImpl, HTMLAttributes>
  = NGridItemImpl
export const NGi: typeof NGridItem = NGridItem

import type { CSSProperties, VNode } from 'vue'
import type { Equal, Expect, ThemeRelatedProps } from '../../_utils'
import type { Size } from '../../avatar/src/interface'
import type { AvatarGroupProps } from './AvatarGroup'
import type {
  AvatarGroupAvatarSlotProps,
  AvatarGroupOption,
  AvatarGroupRestSlotProps
} from './public-types'

interface ResolvableAvatarGroupProps<
  T extends AvatarGroupOption = AvatarGroupOption
> {
  options?: T[]
  vertical?: boolean
  expandOnHover?: boolean
  size?: Size
  max?: number
  maxStyle?: string | CSSProperties
}

// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
type _ =
  //
  Expect<
    Equal<Omit<AvatarGroupProps, ThemeRelatedProps>, ResolvableAvatarGroupProps>
  >

export type GAvatarGroupProps<T extends AvatarGroupOption> =
  ResolvableAvatarGroupProps<T>

export interface GAvatarGroupSlots<T extends AvatarGroupOption> {
  avatar?: (props: AvatarGroupAvatarSlotProps<T>) => VNode[]
  rest?: (props: AvatarGroupRestSlotProps<T>) => VNode[]
  default?: () => VNode[]
}

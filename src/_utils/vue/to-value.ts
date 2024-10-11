import { unref } from 'vue'

import type { MaybeRefOrGetter } from '../../discrete/src/interface'

export function toValue<T>(source: MaybeRefOrGetter<T>): T {
  return typeof source === 'function' ? (source as () => T)() : unref(source)
}

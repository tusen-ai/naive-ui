import type { Ref } from 'vue'

export function createRefSetter (ref: Ref<HTMLElement | null>): any {
  return (inst: { $el: HTMLElement | null } | null) => {
    if (inst) {
      ref.value = inst.$el
    } else {
      ref.value = null
    }
  }
}

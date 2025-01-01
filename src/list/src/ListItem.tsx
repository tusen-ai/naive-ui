import type { SlotsType, VNode } from 'vue'
import { defineComponent, h, inject } from 'vue'
import { throwError } from '../../_utils'
import { listInjectionKey } from './List'

export interface ListItemSlots {
  default?: () => VNode[]
  prefix?: () => VNode[]
  suffix?: () => VNode[]
}

export default defineComponent({
  name: 'ListItem',
  slots: Object as SlotsType<ListItemSlots>,
  setup() {
    const listInjection = inject(listInjectionKey, null)
    if (!listInjection) {
      throwError('list-item', '`n-list-item` must be placed in `n-list`.')
    }
    return {
      showDivider: listInjection.showDividerRef,
      mergedClsPrefix: listInjection.mergedClsPrefixRef
    }
  },
  render() {
    const { $slots, mergedClsPrefix } = this
    return (
      <li class={`${mergedClsPrefix}-list-item`}>
        {$slots.prefix ? (
          <div class={`${mergedClsPrefix}-list-item__prefix`}>
            {$slots.prefix()}
          </div>
        ) : null}
        {$slots.default ? (
          <div class={`${mergedClsPrefix}-list-item__main`}>{$slots}</div>
        ) : null}
        {$slots.suffix ? (
          <div class={`${mergedClsPrefix}-list-item__suffix`}>
            {$slots.suffix()}
          </div>
        ) : null}
        {this.showDivider && (
          <div class={`${mergedClsPrefix}-list-item__divider`} />
        )}
      </li>
    )
  }
})

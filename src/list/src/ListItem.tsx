import { h, renderSlot, defineComponent, inject } from 'vue'
import { throwError } from '../../_utils'
import { listInjectionKey } from './List'

export default defineComponent({
  name: 'ListItem',
  setup () {
    const listInjection = inject(listInjectionKey, null)
    if (!listInjection) {
      throwError('list-item', '`n-list-item` must be placed in `n-list`.')
    }
    return {
      cPrefix: listInjection.mergedClsPrefixRef
    }
  },
  render () {
    const { $slots, cPrefix } = this
    return (
      <li class={`${cPrefix}-list-item`}>
        {$slots.prefix ? (
          <div class={`${cPrefix}-list-item__prefix`}>
            {renderSlot($slots, 'prefix')}
          </div>
        ) : null}
        {$slots.default ? (
          <div class={`${cPrefix}-list-item__main`}>{$slots}</div>
        ) : null}
        {$slots.suffix ? (
          <div class={`${cPrefix}-list-item__suffix`}>
            {renderSlot($slots, 'suffix')}
          </div>
        ) : null}
      </li>
    )
  }
})

import { h, defineComponent, inject } from 'vue'
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
      showDivider: listInjection.showDividerRef,
      mergedClsPrefix: listInjection.mergedClsPrefixRef
    }
  },
  render () {
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

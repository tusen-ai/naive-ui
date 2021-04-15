import { h, defineComponent, inject, ExtractPropTypes } from 'vue'
import { warn } from '../../_utils'
import { breadcrumbInjectionKey } from './Breadcrumb'

const breadcrumbItemProps = {
  separator: String
} as const

export type BreadcrumbItemProps = Partial<
ExtractPropTypes<typeof breadcrumbItemProps>
>

export default defineComponent({
  name: 'BreadcrumbItem',
  props: breadcrumbItemProps,
  setup (props, { slots }) {
    const NBreadcrumb = inject(breadcrumbInjectionKey, null)
    if (!NBreadcrumb) {
      if (__DEV__) {
        warn(
          'breadcrumb',
          '`n-breadcrumb-item` must be placed inside `n-breadcrumb`.'
        )
      }
      return () => null
    }
    const { separatorRef, mergedClsPrefixRef } = NBreadcrumb
    return () => {
      const { value: cPrefix } = mergedClsPrefixRef
      return (
        <span class={`${cPrefix}-breadcrumb-item`}>
          <span class={`${cPrefix}-breadcrumb-item__link`}>{slots}</span>
          <span class={`${cPrefix}-breadcrumb-item__separator`}>
            {slots.separator
              ? slots.separator()
              : props.separator ?? separatorRef.value}
          </span>
        </span>
      )
    }
  }
})

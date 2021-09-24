import {
  h,
  defineComponent,
  inject,
  ExtractPropTypes,
  PropType,
  computed
} from 'vue'
import { warn } from '../../_utils'
import { breadcrumbInjectionKey } from './Breadcrumb'

const breadcrumbItemProps = {
  separator: String,
  href: String as PropType<string | undefined>,
  isCurrent: Boolean as PropType<boolean>
} as const

export type BreadcrumbItemProps = Partial<
ExtractPropTypes<typeof breadcrumbItemProps>
>

export default defineComponent({
  name: 'BreadcrumbItem',
  props: breadcrumbItemProps,
  setup ({ separator, href, isCurrent = false }, { slots }) {
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
    const htmlTag = computed(() => (href ? 'a' : 'span'))
    const ariaCurrent = computed(() => (href && isCurrent ? 'location' : null))

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef

      return h('li', { class: `${mergedClsPrefix}-breadcrumb-item` }, [
        h(
          htmlTag.value,
          {
            class: `${mergedClsPrefix}-breadcrumb-item__link`,
            'aria-current': ariaCurrent.value,
            href
          },
          slots
        ),
        h(
          'span',
          {
            class: `${mergedClsPrefix}-breadcrumb-item__separator`,
            'aria-hidden': true
          },
          slots.separator ? slots.separator() : separator ?? separatorRef.value
        )
      ])
    }
  }
})

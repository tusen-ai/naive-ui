import {
  h,
  defineComponent,
  inject,
  ExtractPropTypes,
  PropType,
  computed
} from 'vue'
import { warn } from '../../_utils'
import { useBrowserLocation } from '../../_utils/composable/use-browser-location'
import { breadcrumbInjectionKey } from './Breadcrumb'

const breadcrumbItemProps = {
  separator: String,
  href: String as PropType<string | undefined>
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
    const browserLocation = useBrowserLocation()

    const htmlTag = computed(() => (props.href ? 'a' : 'span'))
    const ariaCurrent = computed(() =>
      browserLocation.value.href === props.href ? 'location' : null
    )

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef

      return (
        <li class={`${mergedClsPrefix}-breadcrumb-item`}>
          {h(
            htmlTag.value,
            {
              class: `${mergedClsPrefix}-breadcrumb-item__link`,
              'aria-current': ariaCurrent.value,
              href: props.href
            },
            slots
          )}
          <span
            class={`${mergedClsPrefix}-breadcrumb-item__separator`}
            aria-hidden="true"
          >
            {slots.separator
              ? slots.separator()
              : props.separator ?? separatorRef.value}
          </span>
        </li>
      )
    }
  }
})

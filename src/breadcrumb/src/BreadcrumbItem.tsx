import {
  h,
  defineComponent,
  inject,
  type ExtractPropTypes,
  computed,
  type PropType
} from 'vue'
import { resolveSlot, warn } from '../../_utils'
import { useBrowserLocation } from '../../_utils/composable/use-browser-location'
import { breadcrumbInjectionKey } from './Breadcrumb'

export const breadcrumbItemProps = {
  separator: String,
  href: String,
  clickable: {
    type: Boolean,
    default: true
  },
  onClick: Function as PropType<(e: MouseEvent) => void>
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
    const browserLocationRef = useBrowserLocation()

    const htmlTagRef = computed(() => (props.href ? 'a' : 'span'))

    const ariaCurrentRef = computed(() =>
      browserLocationRef.value.href === props.href ? 'location' : null
    )

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <li
          class={[
            `${mergedClsPrefix}-breadcrumb-item`,
            props.clickable && `${mergedClsPrefix}-breadcrumb-item--clickable`
          ]}
        >
          {h(
            htmlTagRef.value,
            {
              class: `${mergedClsPrefix}-breadcrumb-item__link`,
              'aria-current': ariaCurrentRef.value,
              href: props.href,
              onClick: props.onClick
            },
            slots
          )}
          <span
            class={`${mergedClsPrefix}-breadcrumb-item__separator`}
            aria-hidden="true"
          >
            {resolveSlot(slots.separator, () => [
              props.separator ?? separatorRef.value
            ])}
          </span>
        </li>
      )
    }
  }
})

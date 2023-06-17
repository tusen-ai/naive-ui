import { h, toRef, ref, inject, defineComponent, watch, type Ref } from 'vue'
import { useMemo } from 'vooks'
import {
  useInjectionCollection,
  useInjectionElementCollection
} from '../../_utils/composable'
import {
  createInjectionKey,
  type ExtractPublicPropTypes,
  getTitleAttribute
} from '../../_utils'

export interface AnchorInjection {
  activeHref: Ref<string | null>
  mergedClsPrefix: Ref<string>
  updateBarPosition: (el: HTMLElement) => void
  setActiveHref: (href: string, transition?: boolean) => void
  collectedLinkHrefs: string[]
  titleEls: HTMLElement[]
}

export const anchorInjectionKey =
  createInjectionKey<AnchorInjection>('n-anchor')

export const anchorLinkProps = {
  title: String,
  href: String
} as const

export type AnchorLinkProps = ExtractPublicPropTypes<typeof anchorLinkProps>

export default defineComponent({
  name: 'AnchorLink',
  props: anchorLinkProps,
  setup (props, { slots }) {
    const titleRef = ref<HTMLElement | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NAnchor = inject(anchorInjectionKey)!
    const hrefRef = toRef(props, 'href')
    const activeRef = useMemo(() => {
      return hrefRef.value && hrefRef.value === NAnchor.activeHref.value
    })
    useInjectionCollection(anchorInjectionKey, 'collectedLinkHrefs', hrefRef)
    useInjectionElementCollection(
      anchorInjectionKey,
      'titleEls',
      () => titleRef.value
    )
    watch(activeRef, (value) => {
      if (value && titleRef.value) {
        NAnchor.updateBarPosition(titleRef.value)
      }
    })
    function handleClick (): void {
      if (props.href !== undefined) {
        NAnchor.setActiveHref(props.href)
      }
    }
    return () => {
      const { value: mergedClsPrefix } = NAnchor.mergedClsPrefix
      return (
        <div
          class={[
            `${mergedClsPrefix}-anchor-link`,
            activeRef.value && `${mergedClsPrefix}-anchor-link--active`
          ]}
        >
          <a
            ref={titleRef}
            class={[`${mergedClsPrefix}-anchor-link__title`]}
            href={props.href}
            title={getTitleAttribute(props.title)}
            onClick={handleClick}
          >
            {props.title}
          </a>
          {slots.default?.()}
        </div>
      )
    }
  }
})

import {
  h,
  toRef,
  ref,
  inject,
  renderSlot,
  defineComponent,
  watch,
  ExtractPropTypes,
  Ref,
  InjectionKey
} from 'vue'
import { useMemo } from 'vooks'
import {
  useInjectionCollection,
  useInjectionElementCollection
} from '../../_utils/composable'

export interface AnchorInjection {
  activeHref: Ref<string | null>
  mergedClsPrefix: Ref<string>
  updateBarPosition: (el: HTMLElement) => void
  setActiveHref: (href: string, transition?: boolean) => void
  collectedLinkHrefs: string[]
  titleEls: HTMLElement[]
}

export const anchorInjectionKey: InjectionKey<AnchorInjection> = Symbol(
  'anchor'
)

const anchorLinkProps = {
  title: String,
  href: String
} as const

export type AnchorLinkProps = Partial<ExtractPropTypes<typeof anchorLinkProps>>

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
      const { value: cPrefix } = NAnchor.mergedClsPrefix
      return (
        <div class={`${cPrefix}-anchor-link`}>
          <a
            ref={titleRef}
            class={[
              `${cPrefix}-anchor-link__title`,
              activeRef.value && `${cPrefix}-anchor-link__title--active`
            ]}
            href={props.href}
            onClick={handleClick}
          >
            {props.title}
          </a>
          {renderSlot(slots, 'default')}
        </div>
      )
    }
  }
})

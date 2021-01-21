import { h, toRef, ref, inject, renderSlot, defineComponent, watch } from 'vue'
import { useMemo } from 'vooks'
import {
  useInjectionCollection,
  useInjectionElementCollection
} from '../../_utils/composable'

export interface AnchorInjection {
  activeHref: string | null
  updateBarPosition: (el: HTMLElement) => void
  setActiveHref: (href: string, transition?: boolean) => void
  collectedLinkHrefs: string[]
  titleEls: HTMLElement[]
}

export default defineComponent({
  name: 'AnchorLink',
  props: {
    title: {
      type: String,
      required: true
    },
    href: String
  },
  setup (props, { slots }) {
    const titleRef = ref<HTMLElement | null>(null)
    const NAnchor = inject<AnchorInjection>('NAnchor') as AnchorInjection
    const hrefRef = toRef(props, 'href')
    const activeRef = useMemo(() => {
      return hrefRef.value && hrefRef.value === NAnchor.activeHref
    })
    useInjectionCollection('NAnchor', 'collectedLinkHrefs', hrefRef)
    useInjectionElementCollection('NAnchor', 'titleEls', () => titleRef.value)
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
      return (
        <div class="n-anchor-link">
          <a
            ref={titleRef}
            class={[
              'n-anchor-link__title',
              {
                'n-anchor-link__title--active': activeRef.value
              }
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

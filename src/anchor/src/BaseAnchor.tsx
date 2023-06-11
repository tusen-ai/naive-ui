import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  type PropType,
  provide,
  ref,
  toRef,
  watch
} from 'vue'
import { throttle } from 'lodash-es'
import { unwrapElement } from 'seemly'
import { onFontsReady } from 'vooks'
import { NScrollbar } from '../../_internal'
import { keysOf } from '../../_utils'
import { anchorInjectionKey } from './Link'
import type { OffsetTarget } from './utils'
import { getOffset } from './utils'

export interface BaseAnchorInst {
  setActiveHref: (href: string) => void
}

export const baseAnchorProps = {
  type: {
    type: String as PropType<'block' | 'rail'>,
    default: 'rail'
  },
  showRail: {
    type: Boolean,
    default: true
  },
  showBackground: {
    type: Boolean,
    default: true
  },
  bound: {
    type: Number,
    default: 12
  },
  internalScrollable: Boolean,
  ignoreGap: Boolean,
  offsetTarget: [String, Object, Function] as PropType<
  string | OffsetTarget | (() => HTMLElement)
  >
} as const

export const baseAnchorPropKeys = keysOf(baseAnchorProps)

export default defineComponent({
  name: 'BaseAnchor',
  props: {
    ...baseAnchorProps,
    mergedClsPrefix: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const collectedLinkHrefs: string[] = []
    const titleEls: HTMLElement[] = []
    const activeHrefRef = ref<string | null>(null)
    const slotRef = ref<HTMLElement | null>(null)
    const barRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    const isBlockTypeRef = computed(() => {
      return props.type === 'block'
    })
    const mergedShowRailRef = computed(() => {
      return !isBlockTypeRef.value && props.showRail
    })
    function disableTransitionOneTick (): void {
      const { value: barEl } = barRef
      const { value: slotEl } = slotRef
      if (barEl) {
        barEl.style.transition = 'none'
      }
      if (slotEl) {
        slotEl.style.transition = 'none'
      }
      if (titleEls) {
        titleEls.forEach((titleEl) => {
          titleEl.style.transition = 'none'
        })
      }
      void nextTick(() => {
        const { value: nextBarEl } = barRef
        const { value: nextSlotEl } = slotRef
        if (nextBarEl) {
          void nextBarEl.offsetWidth
          nextBarEl.style.transition = ''
        }
        if (nextSlotEl) {
          void nextSlotEl.offsetWidth
          nextSlotEl.style.transition = ''
        }
        if (titleEls) {
          titleEls.forEach((titleEl) => {
            void titleEl.offsetWidth
            titleEl.style.transition = ''
          })
        }
      })
    }
    function updateBarPosition (
      linkTitleEl: HTMLElement,
      transition = true
    ): void {
      const { value: barEl } = barRef
      const { value: slotEl } = slotRef
      const { value: selfEl } = selfRef
      if (!selfEl || !barEl) return
      if (!transition) {
        barEl.style.transition = 'none'
        if (slotEl) slotEl.style.transition = 'none'
      }
      const { offsetHeight, offsetWidth } = linkTitleEl
      const { top: linkTitleClientTop, left: linkTitleClientLeft } =
        linkTitleEl.getBoundingClientRect()
      const { top: anchorClientTop, left: anchorClientLeft } =
        selfEl.getBoundingClientRect()
      const offsetTop = linkTitleClientTop - anchorClientTop
      const offsetLeft = linkTitleClientLeft - anchorClientLeft
      barEl.style.top = `${offsetTop}px`
      barEl.style.height = `${offsetHeight}px`
      if (slotEl) {
        slotEl.style.top = `${offsetTop}px`
        slotEl.style.height = `${offsetHeight}px`
        slotEl.style.maxWidth = `${offsetWidth + offsetLeft}px`
      }
      void barEl.offsetHeight
      if (slotEl) void slotEl.offsetHeight

      if (!transition) {
        barEl.style.transition = ''
        if (slotEl) slotEl.style.transition = ''
      }
    }
    function setActiveHref (href: string, transition = true): void {
      const idMatchResult = /^#([^#]+)$/.exec(href)
      if (!idMatchResult) return
      const linkEl = document.getElementById(idMatchResult[1])
      if (!linkEl) return
      activeHrefRef.value = href
      linkEl.scrollIntoView()
      if (!transition) {
        disableTransitionOneTick()
      }
      handleScroll()
    }
    const handleScroll = throttle(() => {
      _handleScroll(true)
    }, 128)
    function _handleScroll (transition = true): void {
      interface LinkInfo {
        top: number
        height: number
        href: string
      }
      const links: LinkInfo[] = []
      const offsetTarget = unwrapElement(props.offsetTarget ?? document)
      collectedLinkHrefs.forEach((href) => {
        const idMatchResult = /#([^#]+)$/.exec(href)
        if (!idMatchResult) return
        const linkEl = document.getElementById(idMatchResult[1])
        if (linkEl && offsetTarget) {
          const { top, height } = getOffset(linkEl, offsetTarget)
          links.push({
            top,
            height,
            href
          })
        }
      })
      links.sort((a, b) => {
        // ascend top
        if (a.top > b.top) {
          return 1
          // descend height
        } else if (a.top === b.top && a.height < b.height) {
          return -1
        }
        return -1
      })
      const currentActiveHref = activeHrefRef.value
      const { bound, ignoreGap } = props
      const activeLink = links.reduce((prevLink: LinkInfo | null, link) => {
        if (link.top + link.height < 0) {
          if (ignoreGap) {
            return link
          } else {
            return prevLink
          }
        }
        if (link.top <= bound) {
          if (prevLink === null) {
            return link
          } else if (link.top === prevLink.top) {
            if (link.href === currentActiveHref) {
              return link
            } else return prevLink
          } else if (link.top > prevLink.top) {
            return link
          } else {
            return prevLink
          }
        }
        return prevLink
      }, null)
      if (!transition) disableTransitionOneTick()
      if (activeLink) {
        activeHrefRef.value = activeLink.href
      } else {
        activeHrefRef.value = null
      }
    }
    provide(anchorInjectionKey, {
      activeHref: activeHrefRef,
      mergedClsPrefix: toRef(props, 'mergedClsPrefix'),
      updateBarPosition,
      setActiveHref,
      collectedLinkHrefs,
      titleEls
    })
    onMounted(() => {
      document.addEventListener('scroll', handleScroll, true)
      setActiveHref(window.location.hash)
      _handleScroll(false)
    })
    onFontsReady(() => {
      setActiveHref(window.location.hash)
      _handleScroll(false)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('scroll', handleScroll, true)
    })
    watch(activeHrefRef, (value) => {
      if (value === null) {
        const { value: slotEl } = slotRef
        if (slotEl && !isBlockTypeRef.value) {
          slotEl.style.maxWidth = '0'
        }
      }
    })
    return {
      selfRef,
      barRef,
      slotRef,
      setActiveHref,
      activeHref: activeHrefRef,
      isBlockType: isBlockTypeRef,
      mergedShowRail: mergedShowRailRef
    }
  },
  render () {
    const { mergedClsPrefix, mergedShowRail, isBlockType, $slots } = this

    const Anchor = (
      <div
        class={[
          `${mergedClsPrefix}-anchor`,
          isBlockType && `${mergedClsPrefix}-anchor--block`,
          mergedShowRail && `${mergedClsPrefix}-anchor--show-rail`
        ]}
        ref="selfRef"
      >
        {mergedShowRail && this.showBackground ? (
          <div
            ref="slotRef"
            class={`${mergedClsPrefix}-anchor-link-background`}
          />
        ) : null}
        {mergedShowRail ? (
          <div class={`${mergedClsPrefix}-anchor-rail`}>
            <div
              ref="barRef"
              class={[
                `${mergedClsPrefix}-anchor-rail__bar`,
                this.activeHref !== null &&
                  `${mergedClsPrefix}-anchor-rail__bar--active`
              ]}
            />
          </div>
        ) : null}
        {$slots.default?.()}
      </div>
    )

    return this.internalScrollable ? (
      <NScrollbar>
        {{
          default: () => Anchor
        }}
      </NScrollbar>
    ) : (
      Anchor
    )
  }
})

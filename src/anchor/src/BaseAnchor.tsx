import {
  h,
  nextTick,
  ref,
  provide,
  defineComponent,
  PropType,
  watch,
  onBeforeUnmount,
  renderSlot,
  onMounted,
  toRef
} from 'vue'
import { getScrollParent, unwrapElement } from 'seemly'
import { onFontsReady } from 'vooks'
import { warn, keysOf } from '../../_utils'
import { anchorInjectionKey } from './Link'

export interface BaseAnchorInst {
  setActiveHref: (href: string) => void
}

function getOffset (
  el: HTMLElement,
  container: HTMLElement
): {
    top: number
    height: number
  } {
  const { top: elTop, height } = el.getBoundingClientRect()
  const { top: containerTop } = container.getBoundingClientRect()
  return {
    top: elTop - containerTop,
    height
  }
}

export const baseAnchorProps = {
  listenTo: [String, Object] as PropType<string | (() => HTMLElement)>,
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
  ignoreGap: {
    type: Boolean,
    default: false
  },
  // deprecated
  target: {
    type: (Function as unknown) as PropType<(() => HTMLElement) | undefined>,
    validator: () => {
      if (__DEV__) {
        warn('anchor', '`target` is deprecated, please use`listen-to` instead.')
      }
      return true
    },
    default: undefined
  }
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
    let scrollElement: HTMLElement | null
    const collectedLinkHrefs: string[] = []
    const titleEls: HTMLElement[] = []
    const activeHrefRef = ref<string | null>(null)
    const slotRef = ref<HTMLElement | null>(null)
    const barRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
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
      const {
        top: linkTitleClientTop,
        left: linkTitleClientLeft
      } = linkTitleEl.getBoundingClientRect()
      const {
        top: anchorClientTop,
        left: anchorClientLeft
      } = selfEl.getBoundingClientRect()
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
      const idMatchResult = /#([^#]+)$/.exec(href)
      if (idMatchResult) {
        const linkEl = document.getElementById(idMatchResult[1])
        if (linkEl && scrollElement) {
          activeHrefRef.value = href
          const top =
            getOffset(linkEl, scrollElement).top +
            (scrollElement.scrollTop || 0)
          scrollElement.scrollTo({
            top: top
          })
          if (!transition) {
            disableTransitionOneTick()
          }
          handleScroll()
        }
      }
    }
    function handleScroll (): void {
      _handleScroll()
    }
    function _handleScroll (transition = true): void {
      interface LinkInfo {
        top: number
        height: number
        href: string
      }
      const links: LinkInfo[] = []
      collectedLinkHrefs.forEach((href) => {
        const idMatchResult = /#([^#]+)$/.exec(href)
        if (idMatchResult) {
          const linkEl = document.getElementById(idMatchResult[1])
          if (linkEl && scrollElement) {
            const { top, height } = getOffset(linkEl, scrollElement)
            links.push({
              top,
              height,
              href
            })
          }
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
    function init (): void {
      const { target: getScrollTarget, listenTo } = props
      let scrollEl
      if (getScrollTarget) {
        // deprecated
        scrollEl = getScrollTarget()
      } else if (listenTo) {
        scrollEl = unwrapElement(listenTo)
      } else {
        scrollEl = getScrollParent(selfRef.value)
      }
      if (scrollEl) {
        scrollElement = scrollEl
      } else if (__DEV__) {
        warn('anchor', 'Target to be listened to is not valid.')
      }
      if (scrollEl) {
        scrollEl.addEventListener('scroll', handleScroll)
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
      init()
      setActiveHref(String(window.location))
      _handleScroll(false)
    })
    onFontsReady(() => {
      setActiveHref(String(window.location))
      _handleScroll(false)
    })
    onBeforeUnmount(() => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    })
    watch(activeHrefRef, (value) => {
      if (value === null) {
        const { value: slotEl } = slotRef
        if (slotEl) {
          slotEl.style.maxWidth = '0'
        }
      }
    })
    return {
      selfRef,
      barRef,
      slotRef,
      setActiveHref,
      activeHref: activeHrefRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-anchor`,
          this.showRail && `${mergedClsPrefix}-anchor--show-rail`
        ]}
        ref="selfRef"
      >
        {this.showRail && this.showBackground ? (
          <div
            ref="slotRef"
            class={`${mergedClsPrefix}-anchor-link-background`}
          />
        ) : null}
        {this.showRail ? (
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
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
